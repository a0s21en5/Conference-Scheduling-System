using ConferenceManagement.Model;
using Microsoft.AspNetCore.SignalR;

namespace ConferenceManagement.UserHub
{
    public class StatusHub:Hub
    {
        public async Task SendNotification(BookRoom booking)
        {
            await Clients.All.SendAsync("ReceiveNotification", booking.RequestId, booking.UserId, booking.RoomId, booking.Date, booking.TimeSlot, booking.Status);
        }
       /// <summary>
       /// update 10-09-23 mohit
       /// </summary>
       /// <returns></returns>
        public override Task OnConnectedAsync()
        {
            var connectionId = Context.ConnectionId;
            Clients.Client(connectionId).SendAsync("ReceiveSpecificNotification", connectionId);
            return base.OnConnectedAsync();
        }
    }
}

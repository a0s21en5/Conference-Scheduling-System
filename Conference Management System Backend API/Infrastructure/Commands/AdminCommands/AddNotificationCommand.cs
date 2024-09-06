using MediatR;

namespace ConferenceManagement.Infrastructure.Commands.AdminCommands
{
    public class AddNotificationCommand:IRequest<bool>
    {
        public string NotificationData { get; }
        public int UserId { get; }
        public string UserName { get; }
        public string Email { get; }
        public string RoomName { get; }
        public string TimeSlot { get; }
        public string Date { get; }
        public AddNotificationCommand(string notificationData, int userId, string userName, string email, string roomName, string timeSlot, string date)
        {
            NotificationData = notificationData;
            UserId = userId;
            UserName = userName;
            Email = email;
            RoomName = roomName;
            TimeSlot = timeSlot;
            Date = date;
        }
    }
}

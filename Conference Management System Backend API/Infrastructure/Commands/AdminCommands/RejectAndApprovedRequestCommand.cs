using MediatR;

namespace ConferenceManagement.Infrastructure.Commands.AdminCommands
{
    public class RejectAndApprovedRequestCommand:IRequest<bool>
    {
        public string RequestId { get; }
        public int BookingId { get; }
        public int UserId { get; }
        public int RoomId { get; }
        public string Date { get; }
        public string TimeSlot { get; }
        public string Status { get; }
        public RejectAndApprovedRequestCommand(string requestId, int bookingId, int userId, int roomId, string date, string timeSlot, string status)
        {
            RequestId = requestId;
            BookingId = bookingId;
            UserId = userId;
            RoomId = roomId;
            Date = date;
            TimeSlot = timeSlot;
            Status = status;
        }
    }
}

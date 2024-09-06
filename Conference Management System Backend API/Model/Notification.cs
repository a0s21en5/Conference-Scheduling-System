namespace ConferenceManagement.Model
{
    public class Notification
    {
        public int NotificationId { get; set; }
        public string NotificationData { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string RoomName { get; set; }
        public string TimeSlot { get; set; }
        public string Date { get; set; }


    }
}

using ConferenceManagement.Business.AdminDataAccess;
using ConferenceManagement.Infrastructure.Commands.AdminCommands;
using ConferenceManagement.Model;
using MediatR;

namespace ConferenceManagement.Handlers.AdminHandlers
{
    public class AddNotificationCommandHandler : IRequestHandler<AddNotificationCommand, bool>
    {
        private readonly IAdminDataAccess _adminDataAccess;
        public AddNotificationCommandHandler(IAdminDataAccess adminDataAccess)
        {
            _adminDataAccess= adminDataAccess;
        }
        public async Task<bool> Handle(AddNotificationCommand request, CancellationToken cancellationToken)
        {
            Notification notification = new Notification()
            {
                NotificationData = request.NotificationData,
                UserId = request.UserId,
                UserName = request.UserName,
                Email = request.Email,
                RoomName = request.RoomName,
                TimeSlot = request.TimeSlot,
                Date = request.Date
            };


            return await _adminDataAccess.AddNotification(notification);
        }
    }
}

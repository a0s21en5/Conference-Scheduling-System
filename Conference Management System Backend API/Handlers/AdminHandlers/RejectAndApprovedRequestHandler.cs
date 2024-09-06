using ConferenceManagement.Business.AdminDataAccess;
using ConferenceManagement.Infrastructure.Commands.AdminCommands;
using ConferenceManagement.Model;
using MediatR;

namespace ConferenceManagement.Handlers.AdminHandlers
{
    public class RejectAndApprovedRequestHandler : IRequestHandler<RejectAndApprovedRequestCommand, bool>
    {
        private readonly IAdminDataAccess _adminDataAccess;
        public RejectAndApprovedRequestHandler(IAdminDataAccess adminDataAccess)
        {
            _adminDataAccess= adminDataAccess;
        }
        public async Task<bool> Handle(RejectAndApprovedRequestCommand request, CancellationToken cancellationToken)
        {
            BookRoom bookRoom = await _adminDataAccess.GetRequestByRequestId(request.RequestId);
            if (bookRoom != null)
            {
                bookRoom.Status = request.Status;



                return await _adminDataAccess.RejectAndApprovedRequest(bookRoom);
            }
            else
            {
                return false;
            }
        }
    }
}

using ConferenceManagement.Business.AdminDataAccess;
using ConferenceManagement.Infrastructure.Queries.AdminQueries;
using ConferenceManagement.Model;
using MediatR;

namespace ConferenceManagement.Handlers.AdminHandlers
{
    public class GetRequestByRequestIdHandler : IRequestHandler<GetRequestByRequestIdQuery, BookRoom>
    {
        private readonly IAdminDataAccess _adminDataAccess;
        public GetRequestByRequestIdHandler(IAdminDataAccess adminDataAccess)
        {
            _adminDataAccess= adminDataAccess;
        }
        public async Task<BookRoom> Handle(GetRequestByRequestIdQuery request, CancellationToken cancellationToken)
        {
            return await _adminDataAccess.GetRequestByRequestId(request.RequestId);
        }
    }
}

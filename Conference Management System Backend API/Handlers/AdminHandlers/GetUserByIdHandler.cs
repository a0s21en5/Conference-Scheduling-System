using ConferenceManagement.Business.AdminDataAccess;
using ConferenceManagement.Infrastructure.Queries.AdminQueries;
using ConferenceManagement.Model;
using MediatR;

namespace ConferenceManagement.Handlers.AdminHandlers
{
    public class GetUserByIdHandler : IRequestHandler<GetUserByIdQuery, User>
    {
        private readonly IAdminDataAccess _adminDataAccess;
        public GetUserByIdHandler(IAdminDataAccess adminDataAccess)
        {
            _adminDataAccess= adminDataAccess;
        }
        public async Task<User> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
        {
            return await _adminDataAccess.GetUserById(request.User_Id);
        }
    }
}

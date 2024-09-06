using ConferenceManagement.Model;
using MediatR;

namespace ConferenceManagement.Infrastructure.Queries.AdminQueries
{
    public class GetUserByIdQuery:IRequest<User>
    {
        public int User_Id { get; set; }
    }
}

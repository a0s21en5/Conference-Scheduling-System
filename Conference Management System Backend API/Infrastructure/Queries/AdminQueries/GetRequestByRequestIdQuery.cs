using ConferenceManagement.Model;
using MediatR;

namespace ConferenceManagement.Infrastructure.Queries.AdminQueries
{
    public class GetRequestByRequestIdQuery:IRequest<BookRoom>
    {
        public string RequestId { get; set; }
    }
}

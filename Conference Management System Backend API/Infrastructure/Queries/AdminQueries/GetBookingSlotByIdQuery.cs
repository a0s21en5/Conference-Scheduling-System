

using ConferenceManagement.Model;
using MediatR;

namespace ConferenceManagement.Infrastructure.Queries.AdminQueries
{
    public class GetBookingSlotByIdQuery:IRequest<List<BookRoom>>
    {
        public string Date { get; set; }
    }
}

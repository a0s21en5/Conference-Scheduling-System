using ConferenceManagement.Model;
using MediatR;

namespace ConferenceManagement.Infrastructure.Queries.AdminQueries
{
    public class GetBookingSlotByDateAndRoomIdQuery:IRequest<List<BookRoom>>
    {
        public int RoomId { get; set; }
        public string Date  { get; set; }
    }
}

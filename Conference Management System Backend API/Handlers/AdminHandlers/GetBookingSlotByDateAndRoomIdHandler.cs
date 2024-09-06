using ConferenceManagement.Business.AdminDataAccess;
using ConferenceManagement.Infrastructure.Queries.AdminQueries;
using ConferenceManagement.Model;
using MediatR;

namespace ConferenceManagement.Handlers.AdminHandlers
{
    public class GetBookingSlotByDateAndRoomIdHandler : IRequestHandler<GetBookingSlotByDateAndRoomIdQuery, List<BookRoom>>
    {
        private readonly IAdminDataAccess _adminDataAccess;
        public GetBookingSlotByDateAndRoomIdHandler(IAdminDataAccess adminDataAccess)
        {
            _adminDataAccess= adminDataAccess;
        }
        public async Task<List<BookRoom>> Handle(GetBookingSlotByDateAndRoomIdQuery request, CancellationToken cancellationToken)
        {
            List<BookRoom> bookingRoomDetails = await _adminDataAccess.GetBookingSlotByDateAndRoomId(request.RoomId,request.Date);
            if (bookingRoomDetails != null)
            {
                return bookingRoomDetails;
            }
            else
            {
                return null;
            }
        }
    }
}

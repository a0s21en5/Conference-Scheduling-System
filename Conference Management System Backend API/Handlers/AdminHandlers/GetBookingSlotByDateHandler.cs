using ConferenceManagement.Business.AdminDataAccess;
using ConferenceManagement.Infrastructure.Queries.AdminQueries;
using ConferenceManagement.Model;
using MediatR;

namespace ConferenceManagement.Handlers.AdminHandlers
{
    public class GetBookingSlotByDateHandler : IRequestHandler<GetBookingSlotByIdQuery, List<BookRoom>>
    {
        private readonly IAdminDataAccess _adminDataAccess;
        public GetBookingSlotByDateHandler(IAdminDataAccess adminDataAccess)
        {
            _adminDataAccess= adminDataAccess;
        }
        public async Task<List<BookRoom>> Handle(GetBookingSlotByIdQuery request, CancellationToken cancellationToken)
        {
            List<BookRoom> bookingRoomDetails=await _adminDataAccess.GetBookingSlotByDate(request.Date);
            if (bookingRoomDetails!=null)
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

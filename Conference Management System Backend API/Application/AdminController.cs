using ConferenceManagement.Business.Token;
using ConferenceManagement.EncryptionDecryption;
using ConferenceManagement.Exception;
using ConferenceManagement.Infrastructure.Commands.AdminCommands;
using ConferenceManagement.Infrastructure.Queries.AdminQueries;
using ConferenceManagement.Model;
using ConferenceManagement.UserHub;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace ConferenceManagement.Application
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class AdminController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IConfiguration _configuration;
        private readonly ITokenGenerator _tokenGenerator;
        private readonly EncryptAndDecrypt _encryptAndDecrypt;
        private readonly IHubContext<StatusHub> _hubContext;
        public AdminController(IMediator mediator,IConfiguration configuration,ITokenGenerator tokenGenerator, EncryptAndDecrypt encryptAndDecrypt, IHubContext<StatusHub> hubContext)
        {
            _mediator = mediator;
            _configuration = configuration;
            _tokenGenerator = tokenGenerator;
            _encryptAndDecrypt= encryptAndDecrypt;
            _hubContext = hubContext;
        }



        #region Get All User
        /// <summary>
        /// Mohit :- Get All User
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllUser")]
      
        public async Task<ActionResult> GetAllUser()
        {
            try
            {
                List<User> allUsser = await _mediator.Send(new GetAllUserCommand());
                string jsonUser = JsonConvert.SerializeObject(allUsser);
                var enfullDetails = _encryptAndDecrypt.EncryptUsingAES256(jsonUser);
                string userforAngular = JsonConvert.SerializeObject(enfullDetails);
                return Ok(userforAngular);
            }
            catch (UserNullException une)
            {
                return StatusCode(500, une.Message);
            }

        }
        #endregion

        
        #region DeleteRequest By Book Id
        /// <summary>
        /// Mohit :- Delete Request By Book Id
        /// </summary>
        /// <param name="bookId"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("DeleteRequest/{bookId:int}")]
        public async Task<ActionResult> DeleteRequestByBookId(int bookId)
        {
            try
            {
                bool deleteStatus = await _mediator.Send(new DeleteRequestCommand() { BookingId = bookId });
                return Ok(deleteStatus);
            }
            catch (RequestNotFoundException rnfe)
            {
                return StatusCode(500, rnfe.Message);
            }
        }
        #endregion


        #region Delete User
        /// <summary>
        /// Ashish :- Delete User
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("DeleteUser/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                bool DeleteUserStatus = await _mediator.Send(new DeleteUserCommand() { User_Id = id });
                return Ok(DeleteUserStatus);
            }
            catch (UserNullException une)
            {
                return StatusCode(500,une.Message);
            }
        }
        #endregion


        #region Add Room
        /// <summary>
        /// Ashish :- Add Room
        /// </summary>
        /// <param name="conferenceRoom"></param>
        /// <returns></returns>
        [Route("AddRoom")]
        [HttpPost]
        public async Task<IActionResult> AddRoom(ConferenceRoom conferenceRoom)
        {
            try
            {
                bool ConferenceRoomStatus = await _mediator.Send(new AddRoomCommand(conferenceRoom.RoomName, conferenceRoom.Capacity, conferenceRoom.IsAVRoom, conferenceRoom.Image));
                return Ok(ConferenceRoomStatus);
            }
            catch (RoomIdNotFoundException une)
            {
                return StatusCode(500, une.Message);
            }
        }
        #endregion


        #region Update Room
        /// <summary>
        /// Ashish :- Update Room
        /// </summary>
        /// <param name="roomId"></param>
        /// <param name="conferenceRoom"></param>
        /// <returns></returns>
        [Route("UpdateRoom/{roomId:int}")]
        [HttpPut]
        public async Task<IActionResult> UpdateRoom(int roomId, ConferenceRoom conferenceRoom)
        {
            try
            {
                bool UpdateRoomStatus = await _mediator.Send(new UpdateRoomCommand(roomId, conferenceRoom.RoomName, conferenceRoom.Capacity, conferenceRoom.IsAVRoom, conferenceRoom.Image));
                return Ok(UpdateRoomStatus);
            }
            catch (DataNotFoundException dnfe)
            {
                return StatusCode(500,dnfe.Message);
            }
           
        }
        #endregion


        #region Delete Room
        /// <summary> 
        /// Ashish :- Delete Room
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>

        [Route("DeleteRoom/{roomId:int}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteRoom(int roomId)
        {
            try
            {
                bool DeleteUserStatus = await _mediator.Send(new DeleteRoomCommand() { RoomId = roomId });
                return Ok(DeleteUserStatus);
            }
            catch (DataNotFoundException dnfe)
            {
                return StatusCode(500,dnfe.Message);
            }
        }
        #endregion


        #region Display Request By Status
        /// <summary>
        /// Mohit:- Display Request By Status
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("DisplayRequestByStatus/{status}")]
        public async Task<ActionResult> DisplayRequestByStatus(string status)
        {
            try
            {
                List<BookRoom> allPendingRequest = await _mediator.Send(new GetAllRequestByStatus() { Status = status });
                return Ok(allPendingRequest);
            }
            catch (RequestNotFoundException rnfe)
            {
                return StatusCode(500, rnfe.Message);
            }
        }
        #endregion


        #region Get Room By Room Id
        /// <summary>
        /// Mohit:- Get Room By Room Id
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetRoomById/{roomId}")]
        public async Task<ActionResult> GetRoomByRoomId(int roomId)
        {
            try
            {
                ConferenceRoom roomDetails = await _mediator.Send(new GetRoomByRoomIdQueries() { RoomId = roomId });
                return Ok(roomDetails);
            }
            catch (DataNotFoundException dnfe)
            {
                return StatusCode(500, dnfe.Message);
            }
        }
        #endregion


        #region Get All Booking
        /// <summary>
        /// Mansi :- Get All Booking
        /// </summary>
        /// <returns></returns>
        [Route("GetAllBooking")]
        [HttpGet]
        public async Task<ActionResult> GetAllBooking()
        {
            List<BookRoom> AllBookRooms = await _mediator.Send(new GetAllBookingsQuery());
            return Ok(AllBookRooms);
        }
        #endregion


        #region Get Room By Id
        /// <summary>
        /// Mansi :- Get Room By Id
        /// </summary>
        /// <param name="bookingId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetBookingDetails/{bookingId:int}")]
        public async Task<IActionResult> GetBookingDetailsById(int bookingId)
        {
            try
            {
                BookRoom CheckBookRoomById = await _mediator.Send(new GetBookingDetailsByIdQuery() { BookingId = bookingId });
                return Ok(CheckBookRoomById);
            }
            catch (DataNotFoundException dnfe)
            {
                return StatusCode(500, dnfe.Message);
            }

        }
        #endregion

        #region Get All Contact
        /// <summary>
        /// Sachin :- Get All Contact
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllContact")]
        public async Task<IActionResult> GetAllContact()
        {
            List<Contact> AllContact = await _mediator.Send(new GetAllContactQuery());
            return Ok(AllContact);
        }
        #endregion

        #region Get All Notification
        /// <summary>
        /// Mansi :- Get All Notification
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllNotification")]
        public async Task<IActionResult> GetAllNotification()
        {
            List<Notification> allnotification = await _mediator.Send(new GetAllNotificationQuery());
            return Ok(allnotification);
        }
        #endregion

        /// <summary>
        /// Mansi :- Get Request Request Id
        /// </summary>
        /// <param name="requestId"></param>
        /// <returns></returns>
        [Route("GetRequestByRequestId/{requestId}")]
        [HttpGet]
        public async Task<IActionResult> GetRequestByRequestId(string requestId)
        {
            BookRoom CheckBookRoom = await _mediator.Send(new GetRequestByRequestIdQuery() { RequestId = requestId });
            return Ok(CheckBookRoom);
        }
        #region Reject And Approved Request
        /// <summary>
        /// Sachin :- Update And Approved Request
        /// </summary>
        /// <param name="requestId"></param>
        /// <param name="bookRoom"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("RejectAndApprovedRequest/{requestId}/{clientId}")]
        public async Task<IActionResult> RejectAndApprovedRequest(string requestId,string clientId, BookRoom bookRoom)
        {
            bool CheckUpdateAndApprovedRequest = await _mediator.Send(new RejectAndApprovedRequestCommand(requestId, bookRoom.BookingId, bookRoom.UserId, bookRoom.RoomId, bookRoom.Date, bookRoom.TimeSlot, bookRoom.Status));
            if (bookRoom.Status=="Approved")
            {
                await _hubContext.Clients.Client(clientId).SendAsync("privateMessageMethodName", "Your request has been approved");
            }
            else
            {
                await _hubContext.Clients.Client(clientId).SendAsync("privateMessageMethodName", "Your request has been Rejected");
            }
           
            return Ok(CheckUpdateAndApprovedRequest);
        }
        #endregion
        #region Get User By Id
        /// <summary>
        /// Ashish :- Get User By Id
        /// </summary>
        /// <param name="user_Id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetUserById/{userId}")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            User user = await _mediator.Send(new GetUserByIdQuery() { User_Id = userId });
            return Ok(user);
        }
        #endregion
        #region Add Notification
        //Ashish
        /// <summary>
        /// API endpoint to add a notification.
        /// </summary>
        /// <param name="notification">The notification object containing notification details to be added.</param>
        /// <returns>Returns an HTTP response with the status of the add operation on success or an error message on failure.</returns>
        [HttpPost]
        [Route("AddNotification")]
        public async Task<IActionResult> AddNotification(Notification notification)
        {
            // Add the notification with the provided details using the AddNotificationCommand through the mediator.
            bool checkAddNotification = await _mediator.Send(new AddNotificationCommand(notification.NotificationData, notification.UserId, notification.UserName, notification.Email, notification.RoomName, notification.TimeSlot, notification.Date));



            // Return the status of the add operation as an HTTP 200 (OK) response.
            return Ok(checkAddNotification);
        }
        #endregion


        /// <summary>
        /// Mohit :- Get Booking Slot By Date 29-08-2023
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("BookingSlot/{date}")]
        public async Task<ActionResult> GetBookingSlotByDate(string date)
        {
            List<BookRoom> bookingSlotStatus = await _mediator.Send(new GetBookingSlotByIdQuery() { Date = date });
            return Ok(bookingSlotStatus);
        }
        /// <summary>
        /// Mohit :- Get Booking Slot By Date and RoomId 29-08-2023
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("BookingSlot/{roomId}/{date}")]
        public async Task<ActionResult> GetBookingSlotByDateAndRoomId( int roomId,string date)
        {
            List<BookRoom> bookingSlotStatus = await _mediator.Send(new GetBookingSlotByDateAndRoomIdQuery() { RoomId = roomId, Date = date }) ;
            return Ok(bookingSlotStatus);
        }
    }
}

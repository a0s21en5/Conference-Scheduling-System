using ConferenceManagement.EncryptionDecryption;
using ConferenceManagement.Exception;
using ConferenceManagement.Infrastructure.Commands.UserCommands;
using ConferenceManagement.Infrastructure.Queries.AdminQueries;
using ConferenceManagement.Infrastructure.Queries.UserQueries;
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
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly EncryptAndDecrypt _encryptAndDecrypt;
        private readonly IHubContext<StatusHub> _hubContext;

        public UserController(IMediator mediator, IHubContext<StatusHub> hubContext, EncryptAndDecrypt encryptAndDecrypt)
        {
            _mediator = mediator;
            _hubContext = hubContext;
            _encryptAndDecrypt = encryptAndDecrypt;
        }

        #region Book Room
        /// <summary>
        /// Mohit :- Book Room
        /// </summary>
        /// <param name="bookRoom"></param>
        /// <returns></returns>
        //[Authorize]
        [HttpPost]
        [Route("BookRoom")]
        public async Task<ActionResult> BookRoom(BookRoom bookRoom)
        {
            try
            {
                bookRoom.RequestId = Guid.NewGuid().ToString();
                bookRoom.Status = "Pending";
                bool bookStatus = await _mediator.Send(new BookRoomCommand(bookRoom.RequestId, bookRoom.UserId, bookRoom.RoomId, bookRoom.Date, bookRoom.TimeSlot, bookRoom.Status));
                _hubContext.Clients.All.SendAsync("ReceiveNotification", bookRoom.RequestId, bookRoom.UserId, bookRoom.RoomId, bookRoom.Date, bookRoom.TimeSlot, bookRoom.Status);
                return Ok(bookStatus);
            }
            catch (DataNotFoundException dnfe)
            {
                return StatusCode(500, dnfe.Message);
            }
        }
        #endregion



        #region Update User
        /// <summary>
        /// Ashish :- Update User
        /// </summary>
        /// <param name="user_Id"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        //[Authorize]
        [Route("EditUser/{userId}")]
        [HttpPut]
        public async Task<IActionResult> UpdateUser(int userId, User user)
        {
            try
            {
                bool UpdateEmployeeStatus = await _mediator.Send(new UpdateUserCommand(userId, user.Name, user.Email, user.Password, user.Designation));
                return Ok(UpdateEmployeeStatus);
            }
            catch (UserNotFoundException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        #endregion


        #region Display All Room
        /// <summary>
        /// Ashish :- Display All Room
        /// </summary>
        /// <returns></returns>
        //[Authorize]
        [Route("DisplayAllRoom")]
        [HttpGet]
        public async Task<IActionResult> DisplayAllRoom()
        {
            List<ConferenceRoom> AllConferenceRoom = await _mediator.Send(new DisplayAllRoomQuery());
            return Ok(AllConferenceRoom);
        }
        #endregion


        #region Get User By Email
        /// <summary>
        /// Mohit:- 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetUserByEmail/{email}")]
        public async Task<ActionResult> GetUserByEmail(string email)
        {
            try
            {
                string decryptedEmail=_encryptAndDecrypt.DecryptString(email);
                User user = await _mediator.Send(new GetUserByEmailCommand() { Email = decryptedEmail });
                //user.Name = _encryptAndDecrypt.EncryptUsingAES256(user.Name);
                user.Email = _encryptAndDecrypt.EncryptUsingAES256(user.Email);
                //user.Password = _encryptAndDecrypt.EncryptUsingAES256(user.Password);
                //user.Designation = _encryptAndDecrypt.EncryptUsingAES256(user.Designation);
                string jsonUser = JsonConvert.SerializeObject(user);
                var enfullDetails = _encryptAndDecrypt.EncryptUsingAES256(jsonUser);
                var defullDetails = (_encryptAndDecrypt.DecryptString(enfullDetails));
                User deserializedObj = JsonConvert.DeserializeObject<User>(defullDetails);
                //user.IsAdmin = bool.Parse(EncryptUsingAES256(user.IsAdmin.ToString()));
                string userforAngular = JsonConvert.SerializeObject(enfullDetails);
                return Ok(userforAngular);
            }
            catch (UserNullException une)
            {
                return StatusCode(500, une.Message);
            }
        }
        #endregion


        #region Cancle Room
        /// <summary>
        /// Mansi :- CancleRoom
        /// </summary>
        /// <param name="bookingId"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("CancleRoom")]
        public async Task<IActionResult> CancleRoom(int bookingId, string status)
        {
            try
            {
                bool CancleRoomStatus = await _mediator.Send(new CancleRoomCommand(bookingId, status));
                return Ok(CancleRoomStatus);
            }
            catch (RoomIdNotFoundException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        #endregion


        #region Add Contact
        /// <summary>
        /// Mansi :- Add Contact
        /// </summary>
        /// <param name="contact"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("AddContact")]
        public async Task<IActionResult> AddContact(Contact contact)
        {
            try
            {
                bool CheckAddContact = await _mediator.Send(new AddContactCommand(contact.Name, contact.Email, contact.Phone, contact.Message));
                return Ok(CheckAddContact);
            }
            catch (UserFoundException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        #endregion


        #region Room Notification
        /// <summary>
        /// Sachin :- Room Notification
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("RoomNotification")]
        public async Task<IActionResult> RoomNotification(int userId)
        {
            List<BookRoom> AllbookRoomNotification = await _mediator.Send(new RoomNotificationQuery() { UserId = userId });
            return Ok(AllbookRoomNotification);
        }
        #endregion
    }
}

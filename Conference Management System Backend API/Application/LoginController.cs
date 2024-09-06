using ConferenceManagement.EncryptionDecryption;
using ConferenceManagement.Exception;
using ConferenceManagement.Infrastructure.Commands.AdminCommands;
using ConferenceManagement.Infrastructure.Commands.UserCommands;
using ConferenceManagement.Model;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Text;

namespace ConferenceManagement.Application
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly EncryptAndDecrypt _encryptAndDecrypt;
        public LoginController(IMediator mediator, EncryptAndDecrypt encryptAndDecrypt)
        {
            _mediator = mediator;
            _encryptAndDecrypt = encryptAndDecrypt;
        }


        /// <summary>
        /// Mohit :- Login
        /// </summary>
        /// <param name="loginUser"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("loginUser")]
        public async Task<ActionResult> Login(LoginUser loginUser)
        {
            try
            {
                //string decryptedEmail=_encryptAndDecrypt.DecryptString(loginUser.Email);
                User user = await _mediator.Send(new LoginUserCommand() { Email = loginUser.Email, Password = loginUser.Password });
                if (user != null)
                {
                    string userToken = await _mediator.Send(new TokenGenerateCommand() { UserId = user.User_Id, Name = user.Name });
                  
                   // string newtoken = new JwtSecurityTokenHandler().WriteToken(token);
                    HttpContext.Session.SetString("Token", userToken);
                    string encryptedEmail = _encryptAndDecrypt.EncryptUsingAES256(loginUser.Email);
                    //var userSecurityTokenHandler = new JwtSecurityTokenHandler().WriteToken(userJwtSecurityToken);
                    string userJwtSecurityToken = JsonConvert.SerializeObject(new { Token = userToken, Email = encryptedEmail });

                    //return userJwtSecurityTokenHandler;
                    return Ok(userJwtSecurityToken);
                }
                else
                {
                    return null;
                }
            }
            catch (UserNullException une)
            {
                return StatusCode(500,une.Message);
            }
            

        }
        #region Add User
        /// <summary>
        /// Ashish :- Add User
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [Route("AddUser")]
        [HttpPost]
        public async Task<IActionResult> AddUser(User user)
        {
            try
            {
                bool addUserStatus = await _mediator.Send(new AddUserCommand(user.Name, user.Email, user.Password, user.Designation));
                return Ok(addUserStatus);
            }
            catch (UserFoundException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        #endregion


    }
}

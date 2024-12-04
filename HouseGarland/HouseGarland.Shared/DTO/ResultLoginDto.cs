using GarlandHouse.API.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO
{
    public class ResultLoginDto
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }

        public ResultUserDto userDto { get; set; }
    }
}

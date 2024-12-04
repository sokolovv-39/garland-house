using AutoMapper;
using GarlandHouse.DataModel.Entity;
using HouseGarland.Shared.DTO;

namespace GarlandHouse.API.DTO.Mapping
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            //CreateMap<UserDto, UserDto>()
            //    .ForMember(dest => dest.Roles, opt => opt.MapFrom(src => src.Roles));
            CreateMap<RegisterUserDto, User>();
            CreateMap<User, ResultUserDto>();  
        }
    }
}

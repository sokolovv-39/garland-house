using AutoMapper;
using HouseGarland.DataModel.Entity;
using HouseGarland.Shared.DTO.GetOrder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO.Mapping
{
    public class CommentMappingProfile : Profile
    {
        public CommentMappingProfile()
        {
            CreateMap<AddCommentDto, Comment>();

            CreateMap<Comment, ResultCommentDto>()
                .ForMember(dest => dest.WriterFIO, opt => opt.MapFrom(src => src.User.FIO));
        }
    }
}

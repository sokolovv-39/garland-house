using AutoMapper;
using GarlandHouse.DataModel.Entity;
using GarlandHouse.DataModel.Enum;
using HouseGarland.DataModel.Entity;
using HouseGarland.DataModel.Entity.ObjectItems;
using HouseGarland.Shared.DTO;
using HouseGarland.Shared.DTO.CreateOrder;
using HouseGarland.Shared.DTO.GetOrder;

namespace HouseGarland.API.DTO.Mapping
{
    public class OrderMappingProfile : Profile
    {
        public OrderMappingProfile()
        {
            #region CreateOrder

            CreateMap<CreateOrderDto, Order>();
            CreateMap<CreateVersionDto, GarlandHouse.DataModel.Entity.Version>();
            CreateMap<CreateObjectDto, OrderObject>();
            CreateMap<CreateFringeDto, Fringe>();
            CreateMap<CreateNeonDto, Neon>();
            CreateMap<CreateThreadDto, DataModel.Entity.ObjectItems.Thread>();
            CreateMap<CreateBeltLiteDto, BeltLight>();
            CreateMap<CreateCurtainDto, Curtain>();
            CreateMap<CreateRopeDto, Rope>();
            CreateMap<CreatePvsCabelDto, PvsCable>();
            CreateMap<CreateCorrugationDto, Corrugation>();
            CreateMap<CreateBoxPvsCabelDto, BoxPvsCabel>();
            CreateMap<CreateVagiDto, Vagi>();
            CreateMap<CreateSolderBoxDto, SolderBox>();
            CreateMap<CreateScreeds_200_Dto, Screeds_200>();
            CreateMap<CreateScreeds_480_500_Dto, Screeds_480_500>();
            CreateMap<CreateRelaysSwitchesDto, RelaysSwitches>();
            CreateMap<CreateMontageDto, Montage>();
            CreateMap<CreateObjectFileDto, ObjectFile>();
            CreateMap<CreateElectricShieldDto, ElectricShield>();
            CreateMap<CreateReportDto, Report>();

            #endregion

            #region GetOrder

            CreateMap<Order, ResultOrderDto>()
                           .ForMember(dest => dest.ManagerId, opt => opt.MapFrom(src => src.UserOrders.FirstOrDefault(x => x.User.Role == RoleNameEnum.Manager).User.Id))
                           .ForMember(dest => dest.ExecutorId, opt => opt.MapFrom(src => src.UserOrders.FirstOrDefault(x => x.User.Role == RoleNameEnum.Executor).User.Id));
            CreateMap<GarlandHouse.DataModel.Entity.Version, ResultVersionDto>();
            CreateMap<OrderObject, ResultObjectDto>();
            CreateMap<Fringe, ResultFringeDto>();
            CreateMap<Neon, ResultNeonDto>();
            CreateMap<DataModel.Entity.ObjectItems.Thread, ResultThreadDto>();
            CreateMap<BeltLight, ResultBeltLightDto>();
            CreateMap<Curtain, ResultCurtainDto>();
            CreateMap<Rope, ResultRopeDto>();
            CreateMap<PvsCable, ResultPvsCableDto>();
            CreateMap<Corrugation, ResultCorrugationDto>();
            CreateMap<BoxPvsCabel, ResultBoxPvsCableDto>();
            CreateMap<Vagi, ResultVagiDto>();
            CreateMap<SolderBox, ResultSolderBoxDto>();
            CreateMap<Screeds_200, ResultScreed_200_Dto>();
            CreateMap<Screeds_480_500, ResultScreed_480_500_Dto>();
            CreateMap<RelaysSwitches, ResultRelaysSwitchesDto>();
            CreateMap<Montage, ResultMontageDto>();
            CreateMap<ElectricShield, ResultElectricShieldDto>();
            CreateMap<FileEntity, ResultFileEntityDto>();
            CreateMap<ObjectFile, ResultObjectFileDto>()
                .ForMember(dest => dest.Path, opt => opt.MapFrom(src => src.FileEntity.Path));
            CreateMap<Report, ResultReportDto>()
                .ForMember(dest => dest.Path, opt => opt.MapFrom(src => src.FileEntity.Path))
                .ForMember(dest => dest.FileName, opt => opt.MapFrom(src => src.FileEntity.Name));
            #endregion

            CreateMap<Order, OrderCard>()
             .ForMember(dest => dest.ManagerId, opt => opt.MapFrom(src => src.UserOrders.FirstOrDefault(x => x.User.Role == RoleNameEnum.Manager).User.Id))
             .ForMember(dest => dest.ExecutorId, opt => opt.MapFrom(src => src.UserOrders.FirstOrDefault(x => x.User.Role == RoleNameEnum.Executor).User.Id))
             .ForMember(dest => dest.MinBudget, opt => opt.MapFrom(src => src.Versions.Any()
                 ? src.Versions.Min(x => x.Budget)
                 : 0))
             .ForMember(dest => dest.MaxBudget, opt => opt.MapFrom(src => src.Versions.Any()
                 ? src.Versions.Max(x => x.Budget)
                 : 0));

        }
    }
}

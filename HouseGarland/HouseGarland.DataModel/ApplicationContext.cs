namespace GarlandHouse.DataModel
{
    using GarlandHouse.DataModel.Entity;
    using HouseGarland.DataModel.Entity;
    using HouseGarland.DataModel.Entity.ObjectItems;
    using Microsoft.EntityFrameworkCore;
    public class ApplicationContext : DbContext
    {
        #region DbSets
        public DbSet<User> Users { get; set; } = null!;

        public DbSet<Order> Orders { get; set; } = null!;

        public DbSet<Version> Versions { get; set; } = null!;

        public DbSet<OrderObject> OrderObjects { get; set; } = null!;

        public DbSet<Fringe> Fringes { get; set; } = null!;

        public DbSet<Neon> Neons { get; set; } = null!;

        public DbSet<Thread> Threads { get; set; } = null!;

        public DbSet<BeltLight> BeltLights { get; set; } = null!;

        public DbSet<Curtain> Curtains { get; set; } = null!;

        public DbSet<Rope> Ropes { get; set; } = null!;

        public DbSet<PvsCable> PvsCables { get; set; } = null!;

        public DbSet<Corrugation> Corrugations { get; set; } = null!;

        public DbSet<BoxPvsCabel> BoxPvsCabels { get; set; } = null!;

        public DbSet<Vagi> Vagies { get; set; } = null!;

        public DbSet<SolderBox> SolderBoxes { get; set; } = null!;

        public DbSet<Screeds_200> Screeds_200s { get; set; } = null!;

        public DbSet<Screeds_480_500> Screeds_480_500s { get; set; } = null!;

        public DbSet<RelaysSwitches> RelaysSwitches { get; set; } = null!;

        public DbSet<Montage> Montages { get; set; } = null!;

        public DbSet<ElectricShield> ElectricShields { get; set; } = null!;

        public DbSet<ObjectFile> ObjectFiles { get; set; } = null!;

        public DbSet<FileEntity> FileEntities { get; set; } = null!;

        public DbSet<Work> Works { get; set; } = null!;

        public DbSet<Comment> Comments { get; set; } = null!;

        public DbSet<Report> Reports { get; set; } = null !;

        #endregion
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            if (Database.GetPendingMigrations().Any())
            {
                Database.Migrate();
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(x => x.Email)
                .IsUnique();

            modelBuilder.Entity<UserOrder>()
               .HasKey(ur => new { ur.UserId, ur.OrderId });

            modelBuilder.Entity<UserOrder>()
                .HasOne(ur => ur.User)
                .WithMany(u => u.UserOrders)
                .HasForeignKey(ur => ur.UserId);

            modelBuilder.Entity<UserOrder>()
                .HasOne(ur => ur.Order)
                .WithMany(r => r.UserOrders)
                .HasForeignKey(ur => ur.OrderId);

            modelBuilder.Entity<Order>()
                .HasMany(x => x.Versions)
                .WithOne(x => x.BaseOrder)
                .HasForeignKey(x => x.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Version>()
                .HasMany(x => x.Objects)
                .WithOne(x => x.Version)
                .HasForeignKey(x => x.VersionId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderObject>()
                .HasMany(x => x.Fringes)
                .WithOne(x => x.OrderObject)
                .HasForeignKey(x => x.OrderObjectId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderObject>()
                .HasMany(x => x.Neons)
                .WithOne(x => x.OrderObject)
                .HasForeignKey(x => x.OrderObjectId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderObject>()
               .HasMany(x => x.Threads)
               .WithOne(x => x.OrderObject)
               .HasForeignKey(x => x.OrderObjectId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderObject>()
               .HasMany(x => x.BeltLights)
               .WithOne(x => x.OrderObject)
               .HasForeignKey(x => x.OrderObjectId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderObject>()
                .HasMany(x => x.Threads)
                .WithOne(x => x.OrderObject)
                .HasForeignKey(x => x.OrderObjectId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderObject>()
               .HasMany(x => x.Curtains)
               .WithOne(x => x.OrderObject)
               .HasForeignKey(x => x.OrderObjectId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderObject>()
               .HasMany(x => x.Ropes)
               .WithOne(x => x.OrderObject)
               .HasForeignKey(x => x.OrderObjectId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderObject>()
               .HasMany(x => x.PvsCables)
               .WithOne(x => x.OrderObject)
               .HasForeignKey(x => x.OrderObjectId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderObject>()
               .HasMany(x => x.Corrugations)
               .WithOne(x => x.OrderObject)
               .HasForeignKey(x => x.OrderObjectId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderObject>()
               .HasMany(x => x.BoxPvsCabels)
               .WithOne(x => x.OrderObject)
               .HasForeignKey(x => x.OrderObjectId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderObject>()
               .HasMany(x => x.Vagies)
               .WithOne(x => x.OrderObject)
               .HasForeignKey(x => x.OrderObjectId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderObject>()
               .HasMany(x => x.SolderBoxes)
               .WithOne(x => x.OrderObject)
               .HasForeignKey(x => x.OrderObjectId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderObject>()
               .HasMany(x => x.Screeds_200)
               .WithOne(x => x.OrderObject)
               .HasForeignKey(x => x.OrderObjectId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderObject>()
               .HasMany(x => x.Screeds_480_500)
               .WithOne(x => x.OrderObject)
               .HasForeignKey(x => x.OrderObjectId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderObject>()
               .HasMany(x => x.RelaysSwitches)
               .WithOne(x => x.OrderObject)
               .HasForeignKey(x => x.OrderObjectId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderObject>()
               .HasMany(x => x.Montages)
               .WithOne(x => x.OrderObject)
               .HasForeignKey(x => x.OrderObjectId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderObject>()
                .HasMany(x => x.ElectricShields)
                .WithOne(x => x.OrderObject)
                .HasForeignKey(x => x.OrderObjectId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderObject>()
                .HasMany(x => x.ObjectFiles)
                .WithOne(x => x.OrderObject)
                .HasForeignKey(x => x.OrderObjectId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ObjectFile>()
                .HasOne(of => of.FileEntity)
                .WithOne()
                .HasForeignKey<ObjectFile>(of => of.FileEntityId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Work>()
                .HasOne(x => x.FileEntity)
                .WithOne()
                .HasForeignKey<Work>(of => of.FileEntityId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<FileEntity>()
                .HasIndex(x => x.Path)
                .IsUnique();

            modelBuilder.Entity<Order>()
                .HasMany(x => x.Comments)
                .WithOne(x => x.Order)
                .HasForeignKey(x => x.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Order>()
                .HasMany(x => x.Reports)
                .WithOne(o => o.Order)
                .HasForeignKey(or => or.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Report>()
                .HasOne(or => or.FileEntity)
                .WithOne()
                .HasForeignKey<Report>(or => or.FileEntityId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasMany(x => x.Comments)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

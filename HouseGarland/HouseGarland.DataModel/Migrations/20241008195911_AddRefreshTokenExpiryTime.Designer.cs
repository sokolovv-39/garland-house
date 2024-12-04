﻿// <auto-generated />
using System;
using GarlandHouse.DataModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HouseGarland.DataModel.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20241008195911_AddRefreshTokenExpiryTime")]
    partial class AddRefreshTokenExpiryTime
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("GarlandHouse.DataModel.Entity.FileEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ContentType")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<byte[]>("Data")
                        .IsRequired()
                        .HasColumnType("bytea");

                    b.Property<int>("OrderObjectId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("OrderObjectId");

                    b.ToTable("FileEntities");
                });

            modelBuilder.Entity("GarlandHouse.DataModel.Entity.Garland", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("ExtenderCount")
                        .HasColumnType("integer");

                    b.Property<int>("FringeMeters")
                        .HasColumnType("integer");

                    b.Property<int>("GlowType")
                        .HasColumnType("integer");

                    b.Property<int>("LightingType")
                        .HasColumnType("integer");

                    b.Property<int>("MountingType")
                        .HasColumnType("integer");

                    b.Property<int>("OrderObjectId")
                        .HasColumnType("integer");

                    b.Property<int>("PowerSupplyCount")
                        .HasColumnType("integer");

                    b.Property<int>("TeeCount")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("OrderObjectId");

                    b.ToTable("Garlands");
                });

            modelBuilder.Entity("GarlandHouse.DataModel.Entity.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Budget")
                        .HasColumnType("integer");

                    b.Property<string>("ContractNumber")
                        .HasColumnType("text");

                    b.Property<string>("CustomerFIO")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("CustomerPhone")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LinkToAmoCRM")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LinkToYandexDisk")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LinkToYandexMap")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("MeasurementComment")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("MeasurementDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("PaymentMethodForMeasurement")
                        .HasColumnType("integer");

                    b.Property<int>("PriceForMeasurement")
                        .HasColumnType("integer");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("GarlandHouse.DataModel.Entity.OrderObject", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("VersionId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("VersionId");

                    b.ToTable("OrderObjects");
                });

            modelBuilder.Entity("GarlandHouse.DataModel.Entity.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FIO")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("RefreshToken")
                        .HasColumnType("text");

                    b.Property<DateTime>("RefreshTokenExpiryTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Role")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("GarlandHouse.DataModel.Entity.UserOrder", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.Property<int>("OrderId")
                        .HasColumnType("integer");

                    b.HasKey("UserId", "OrderId");

                    b.HasIndex("OrderId");

                    b.ToTable("UserOrder");
                });

            modelBuilder.Entity("GarlandHouse.DataModel.Entity.Version", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("OrderId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.ToTable("Versions");
                });

            modelBuilder.Entity("GarlandHouse.DataModel.Entity.FileEntity", b =>
                {
                    b.HasOne("GarlandHouse.DataModel.Entity.OrderObject", "OrderObject")
                        .WithMany("FileEntities")
                        .HasForeignKey("OrderObjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("OrderObject");
                });

            modelBuilder.Entity("GarlandHouse.DataModel.Entity.Garland", b =>
                {
                    b.HasOne("GarlandHouse.DataModel.Entity.OrderObject", "OrderObject")
                        .WithMany("Garlands")
                        .HasForeignKey("OrderObjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("OrderObject");
                });

            modelBuilder.Entity("GarlandHouse.DataModel.Entity.OrderObject", b =>
                {
                    b.HasOne("GarlandHouse.DataModel.Entity.Version", "Version")
                        .WithMany("Objects")
                        .HasForeignKey("VersionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Version");
                });

            modelBuilder.Entity("GarlandHouse.DataModel.Entity.UserOrder", b =>
                {
                    b.HasOne("GarlandHouse.DataModel.Entity.Order", "Order")
                        .WithMany("UserOrders")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GarlandHouse.DataModel.Entity.User", "User")
                        .WithMany("UserOrders")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Order");

                    b.Navigation("User");
                });

            modelBuilder.Entity("GarlandHouse.DataModel.Entity.Version", b =>
                {
                    b.HasOne("GarlandHouse.DataModel.Entity.Order", "Order")
                        .WithMany("Versions")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Order");
                });

            modelBuilder.Entity("GarlandHouse.DataModel.Entity.Order", b =>
                {
                    b.Navigation("UserOrders");

                    b.Navigation("Versions");
                });

            modelBuilder.Entity("GarlandHouse.DataModel.Entity.OrderObject", b =>
                {
                    b.Navigation("FileEntities");

                    b.Navigation("Garlands");
                });

            modelBuilder.Entity("GarlandHouse.DataModel.Entity.User", b =>
                {
                    b.Navigation("UserOrders");
                });

            modelBuilder.Entity("GarlandHouse.DataModel.Entity.Version", b =>
                {
                    b.Navigation("Objects");
                });
#pragma warning restore 612, 618
        }
    }
}

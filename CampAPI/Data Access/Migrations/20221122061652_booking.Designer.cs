﻿// <auto-generated />
using System;
using DataAccess.DBContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;


namespace DataAccess.Migrations
{
    [DbContext(typeof(CampDbContext))]
    [Migration("20221122061652_booking")]
    partial class booking
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("TestCamp.Models.Booking", b =>
                {
                    b.Property<string>("brn")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("amount")
                        .HasColumnType("bigint");

                    b.Property<string>("country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("nights")
                        .HasColumnType("bigint");

                    b.Property<long>("phone")
                        .HasColumnType("bigint");

                    b.Property<string>("state")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("zip")
                        .HasColumnType("bigint");

                    b.HasKey("brn");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("TestCamp.Models.Camp", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Capacity")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Img")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("Rate")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.ToTable("Camps");
                });
#pragma warning restore 612, 618
        }
    }
}

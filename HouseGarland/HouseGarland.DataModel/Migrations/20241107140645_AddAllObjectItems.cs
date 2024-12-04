using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HouseGarland.DataModel.Migrations
{
    /// <inheritdoc />
    public partial class AddAllObjectItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Garlands");

            migrationBuilder.CreateTable(
                name: "BeltLights",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Lenght = table.Column<int>(type: "integer", nullable: false),
                    GlowShade = table.Column<int>(type: "integer", nullable: false),
                    LampStep = table.Column<int>(type: "integer", nullable: false),
                    CableColor = table.Column<int>(type: "integer", nullable: false),
                    PvsLenght = table.Column<int>(type: "integer", nullable: false),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    OrderObjectId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BeltLights", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BeltLights_OrderObjects_OrderObjectId",
                        column: x => x.OrderObjectId,
                        principalTable: "OrderObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BoxPvsCabels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    OrderObjectId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BoxPvsCabels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BoxPvsCabels_OrderObjects_OrderObjectId",
                        column: x => x.OrderObjectId,
                        principalTable: "OrderObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Corrugations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    OrderObjectId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Corrugations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Corrugations_OrderObjects_OrderObjectId",
                        column: x => x.OrderObjectId,
                        principalTable: "OrderObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Curtains",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    OrderObjectId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Curtains", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Curtains_OrderObjects_OrderObjectId",
                        column: x => x.OrderObjectId,
                        principalTable: "OrderObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ElectricShields",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    OrderObjectId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ElectricShields", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ElectricShields_OrderObjects_OrderObjectId",
                        column: x => x.OrderObjectId,
                        principalTable: "OrderObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Fringes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    GlowShade = table.Column<int>(type: "integer", nullable: false),
                    GlowMode = table.Column<int>(type: "integer", nullable: false),
                    CableColor = table.Column<int>(type: "integer", nullable: false),
                    Bracing = table.Column<int>(type: "integer", nullable: false),
                    Led = table.Column<int>(type: "integer", nullable: false),
                    Surface = table.Column<int>(type: "integer", nullable: true),
                    Multiplicity = table.Column<int>(type: "integer", nullable: false),
                    ExtenderCount = table.Column<int>(type: "integer", nullable: false),
                    TeeCount = table.Column<int>(type: "integer", nullable: false),
                    PowerSupplyCount = table.Column<int>(type: "integer", nullable: false),
                    Length = table.Column<int>(type: "integer", nullable: false),
                    Tees = table.Column<int>(type: "integer", nullable: false),
                    PowerUnits = table.Column<int>(type: "integer", nullable: false),
                    Extensions1m = table.Column<int>(type: "integer", nullable: false),
                    Extensions3m = table.Column<int>(type: "integer", nullable: false),
                    Extensions5m = table.Column<int>(type: "integer", nullable: false),
                    Extensions10m = table.Column<int>(type: "integer", nullable: false),
                    Contours = table.Column<int>(type: "integer", nullable: false),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    OrderObjectId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fringes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Fringes_OrderObjects_OrderObjectId",
                        column: x => x.OrderObjectId,
                        principalTable: "OrderObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Montages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    OrderObjectId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Montages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Montages_OrderObjects_OrderObjectId",
                        column: x => x.OrderObjectId,
                        principalTable: "OrderObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Neons",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    GlowShade = table.Column<int>(type: "integer", nullable: false),
                    Thickness = table.Column<int>(type: "integer", nullable: false),
                    Lenght = table.Column<int>(type: "integer", nullable: false),
                    Painting = table.Column<bool>(type: "boolean", nullable: false),
                    RalLenght = table.Column<int>(type: "integer", nullable: true),
                    NoRalLenght = table.Column<int>(type: "integer", nullable: true),
                    Ral = table.Column<string>(type: "text", nullable: true),
                    PowerUnits = table.Column<int>(type: "integer", nullable: false),
                    Needles = table.Column<int>(type: "integer", nullable: false),
                    IsScreeds_200mm = table.Column<bool>(type: "boolean", nullable: false),
                    FlexibleConnector = table.Column<int>(type: "integer", nullable: false),
                    Contours = table.Column<int>(type: "integer", nullable: false),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    OrderObjectId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Neons", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Neons_OrderObjects_OrderObjectId",
                        column: x => x.OrderObjectId,
                        principalTable: "OrderObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PvsCables",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    OrderObjectId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PvsCables", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PvsCables_OrderObjects_OrderObjectId",
                        column: x => x.OrderObjectId,
                        principalTable: "OrderObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RelaysSwitches",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    OrderObjectId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RelaysSwitches", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RelaysSwitches_OrderObjects_OrderObjectId",
                        column: x => x.OrderObjectId,
                        principalTable: "OrderObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Ropes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    OrderObjectId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ropes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ropes_OrderObjects_OrderObjectId",
                        column: x => x.OrderObjectId,
                        principalTable: "OrderObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Screeds_200s",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    OrderObjectId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Screeds_200s", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Screeds_200s_OrderObjects_OrderObjectId",
                        column: x => x.OrderObjectId,
                        principalTable: "OrderObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Screeds_480_500s",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    OrderObjectId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Screeds_480_500s", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Screeds_480_500s_OrderObjects_OrderObjectId",
                        column: x => x.OrderObjectId,
                        principalTable: "OrderObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SolderBoxes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    OrderObjectId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SolderBoxes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SolderBoxes_OrderObjects_OrderObjectId",
                        column: x => x.OrderObjectId,
                        principalTable: "OrderObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Threads",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    GlowShade = table.Column<int>(type: "integer", nullable: false),
                    GlowMode = table.Column<int>(type: "integer", nullable: false),
                    Bracing = table.Column<int>(type: "integer", nullable: false),
                    Surface = table.Column<int>(type: "integer", nullable: false),
                    ScreedsType = table.Column<int>(type: "integer", nullable: false),
                    Length = table.Column<int>(type: "integer", nullable: false),
                    CableColor = table.Column<int>(type: "integer", nullable: false),
                    PowerUnits = table.Column<int>(type: "integer", nullable: false),
                    Tees = table.Column<int>(type: "integer", nullable: false),
                    Extensions1m = table.Column<int>(type: "integer", nullable: false),
                    Extensions3m = table.Column<int>(type: "integer", nullable: false),
                    Extensions5m = table.Column<int>(type: "integer", nullable: false),
                    Extensions10m = table.Column<int>(type: "integer", nullable: false),
                    TreeHeight = table.Column<int>(type: "integer", nullable: true),
                    Contours = table.Column<int>(type: "integer", nullable: false),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    OrderObjectId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Threads", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Threads_OrderObjects_OrderObjectId",
                        column: x => x.OrderObjectId,
                        principalTable: "OrderObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Vagies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    OrderObjectId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vagies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vagies_OrderObjects_OrderObjectId",
                        column: x => x.OrderObjectId,
                        principalTable: "OrderObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BeltLights_OrderObjectId",
                table: "BeltLights",
                column: "OrderObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_BoxPvsCabels_OrderObjectId",
                table: "BoxPvsCabels",
                column: "OrderObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Corrugations_OrderObjectId",
                table: "Corrugations",
                column: "OrderObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Curtains_OrderObjectId",
                table: "Curtains",
                column: "OrderObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ElectricShields_OrderObjectId",
                table: "ElectricShields",
                column: "OrderObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Fringes_OrderObjectId",
                table: "Fringes",
                column: "OrderObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Montages_OrderObjectId",
                table: "Montages",
                column: "OrderObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Neons_OrderObjectId",
                table: "Neons",
                column: "OrderObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_PvsCables_OrderObjectId",
                table: "PvsCables",
                column: "OrderObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_RelaysSwitches_OrderObjectId",
                table: "RelaysSwitches",
                column: "OrderObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Ropes_OrderObjectId",
                table: "Ropes",
                column: "OrderObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Screeds_200s_OrderObjectId",
                table: "Screeds_200s",
                column: "OrderObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Screeds_480_500s_OrderObjectId",
                table: "Screeds_480_500s",
                column: "OrderObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_SolderBoxes_OrderObjectId",
                table: "SolderBoxes",
                column: "OrderObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Threads_OrderObjectId",
                table: "Threads",
                column: "OrderObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Vagies_OrderObjectId",
                table: "Vagies",
                column: "OrderObjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BeltLights");

            migrationBuilder.DropTable(
                name: "BoxPvsCabels");

            migrationBuilder.DropTable(
                name: "Corrugations");

            migrationBuilder.DropTable(
                name: "Curtains");

            migrationBuilder.DropTable(
                name: "ElectricShields");

            migrationBuilder.DropTable(
                name: "Fringes");

            migrationBuilder.DropTable(
                name: "Montages");

            migrationBuilder.DropTable(
                name: "Neons");

            migrationBuilder.DropTable(
                name: "PvsCables");

            migrationBuilder.DropTable(
                name: "RelaysSwitches");

            migrationBuilder.DropTable(
                name: "Ropes");

            migrationBuilder.DropTable(
                name: "Screeds_200s");

            migrationBuilder.DropTable(
                name: "Screeds_480_500s");

            migrationBuilder.DropTable(
                name: "SolderBoxes");

            migrationBuilder.DropTable(
                name: "Threads");

            migrationBuilder.DropTable(
                name: "Vagies");

            migrationBuilder.CreateTable(
                name: "Garlands",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderObjectId = table.Column<int>(type: "integer", nullable: false),
                    ExtenderCount = table.Column<int>(type: "integer", nullable: false),
                    FringeMeters = table.Column<int>(type: "integer", nullable: false),
                    GlowType = table.Column<int>(type: "integer", nullable: false),
                    LightingType = table.Column<int>(type: "integer", nullable: false),
                    MountingType = table.Column<int>(type: "integer", nullable: false),
                    PowerSupplyCount = table.Column<int>(type: "integer", nullable: false),
                    TeeCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Garlands", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Garlands_OrderObjects_OrderObjectId",
                        column: x => x.OrderObjectId,
                        principalTable: "OrderObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Garlands_OrderObjectId",
                table: "Garlands",
                column: "OrderObjectId");
        }
    }
}

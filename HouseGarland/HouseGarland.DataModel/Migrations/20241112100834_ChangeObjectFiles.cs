using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HouseGarland.DataModel.Migrations
{
    /// <inheritdoc />
    public partial class ChangeObjectFiles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FileEntities_OrderObjects_OrderObjectId",
                table: "FileEntities");

            migrationBuilder.DropIndex(
                name: "IX_FileEntities_OrderObjectId",
                table: "FileEntities");

            migrationBuilder.DropColumn(
                name: "OrderObjectId",
                table: "FileEntities");

            migrationBuilder.DropColumn(
                name: "TypeEnum",
                table: "FileEntities");

            migrationBuilder.CreateTable(
                name: "ObjectFile",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TypeEnum = table.Column<int>(type: "integer", nullable: false),
                    FileEntityId = table.Column<int>(type: "integer", nullable: false),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    OrderObjectId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ObjectFile", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ObjectFile_FileEntities_FileEntityId",
                        column: x => x.FileEntityId,
                        principalTable: "FileEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ObjectFile_OrderObjects_OrderObjectId",
                        column: x => x.OrderObjectId,
                        principalTable: "OrderObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FileEntities_Path",
                table: "FileEntities",
                column: "Path",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ObjectFile_FileEntityId",
                table: "ObjectFile",
                column: "FileEntityId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ObjectFile_OrderObjectId",
                table: "ObjectFile",
                column: "OrderObjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ObjectFile");

            migrationBuilder.DropIndex(
                name: "IX_FileEntities_Path",
                table: "FileEntities");

            migrationBuilder.AddColumn<int>(
                name: "OrderObjectId",
                table: "FileEntities",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TypeEnum",
                table: "FileEntities",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_FileEntities_OrderObjectId",
                table: "FileEntities",
                column: "OrderObjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_FileEntities_OrderObjects_OrderObjectId",
                table: "FileEntities",
                column: "OrderObjectId",
                principalTable: "OrderObjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

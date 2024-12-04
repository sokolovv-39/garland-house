using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HouseGarland.DataModel.Migrations
{
    /// <inheritdoc />
    public partial class ChangeFileEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Data",
                table: "FileEntities");

            migrationBuilder.AddColumn<string>(
                name: "Path",
                table: "FileEntities",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Path",
                table: "FileEntities");

            migrationBuilder.AddColumn<byte[]>(
                name: "Data",
                table: "FileEntities",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0]);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HouseGarland.DataModel.Migrations
{
    /// <inheritdoc />
    public partial class RenameLengthFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LinkToYandexDisk",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "RalLenght",
                table: "Neons",
                newName: "RalLength");

            migrationBuilder.RenameColumn(
                name: "NoRalLenght",
                table: "Neons",
                newName: "NoRalLength");

            migrationBuilder.RenameColumn(
                name: "PvsLenght",
                table: "BeltLights",
                newName: "PvsLength");

            migrationBuilder.AddColumn<int>(
                name: "Contours",
                table: "BeltLights",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Contours",
                table: "BeltLights");

            migrationBuilder.RenameColumn(
                name: "RalLength",
                table: "Neons",
                newName: "RalLenght");

            migrationBuilder.RenameColumn(
                name: "NoRalLength",
                table: "Neons",
                newName: "NoRalLenght");

            migrationBuilder.RenameColumn(
                name: "PvsLength",
                table: "BeltLights",
                newName: "PvsLenght");

            migrationBuilder.AddColumn<string>(
                name: "LinkToYandexDisk",
                table: "Orders",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}

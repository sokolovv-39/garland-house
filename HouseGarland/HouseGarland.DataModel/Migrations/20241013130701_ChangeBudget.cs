using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HouseGarland.DataModel.Migrations
{
    /// <inheritdoc />
    public partial class ChangeBudget : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Budget",
                table: "Orders");

            migrationBuilder.AddColumn<long>(
                name: "Budget",
                table: "Versions",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Budget",
                table: "Versions");

            migrationBuilder.AddColumn<int>(
                name: "Budget",
                table: "Orders",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}

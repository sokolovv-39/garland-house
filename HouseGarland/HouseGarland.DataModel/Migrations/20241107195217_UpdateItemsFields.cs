using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HouseGarland.DataModel.Migrations
{
    /// <inheritdoc />
    public partial class UpdateItemsFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PowerSupplyCount",
                table: "Fringes");

            migrationBuilder.RenameColumn(
                name: "Lenght",
                table: "Neons",
                newName: "Plugs");

            migrationBuilder.RenameColumn(
                name: "Lenght",
                table: "BeltLights",
                newName: "Length");

            migrationBuilder.AddColumn<int>(
                name: "Count",
                table: "Vagies",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Model",
                table: "Vagies",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Color",
                table: "SolderBoxes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Count",
                table: "SolderBoxes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Color",
                table: "Screeds_480_500s",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Count",
                table: "Screeds_480_500s",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Color",
                table: "Screeds_200s",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Count",
                table: "Screeds_200s",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Contours",
                table: "Ropes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DuplexClamps",
                table: "Ropes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Lanyards",
                table: "Ropes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Length",
                table: "Ropes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Surface",
                table: "Ropes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Thickness",
                table: "Ropes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AstroRele",
                table: "RelaysSwitches",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PhotoRele",
                table: "RelaysSwitches",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Simple_1",
                table: "RelaysSwitches",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Simple_2",
                table: "RelaysSwitches",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WirelessWifi_1",
                table: "RelaysSwitches",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WirelessWifi_2",
                table: "RelaysSwitches",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WirelessWifi_3",
                table: "RelaysSwitches",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Wireless_1",
                table: "RelaysSwitches",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Wireless_2",
                table: "RelaysSwitches",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Wireless_3",
                table: "RelaysSwitches",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CableColor",
                table: "PvsCables",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Length",
                table: "PvsCables",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Length",
                table: "Neons",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AutotowerByHours",
                table: "Montages",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AutotowerMobileKm",
                table: "Montages",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Autotower_16_20m",
                table: "Montages",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Autotower_22_24m",
                table: "Montages",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Autotower_26_36m",
                table: "Montages",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Climber",
                table: "Montages",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MontageFringe",
                table: "Montages",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MontageNeon",
                table: "Montages",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MontageThread",
                table: "Montages",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Count",
                table: "ElectricShields",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Bracing",
                table: "Curtains",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CableColor",
                table: "Curtains",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Contours",
                table: "Curtains",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Count",
                table: "Curtains",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Extensions1m",
                table: "Curtains",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Extensions3m",
                table: "Curtains",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "GlowMode",
                table: "Curtains",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "GlowShade",
                table: "Curtains",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PowerUnits",
                table: "Curtains",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Size",
                table: "Curtains",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Surface",
                table: "Curtains",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Tees",
                table: "Curtains",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CableColor",
                table: "Corrugations",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Length",
                table: "Corrugations",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Thickness",
                table: "Corrugations",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Color",
                table: "BoxPvsCabels",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Length",
                table: "BoxPvsCabels",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Count",
                table: "Vagies");

            migrationBuilder.DropColumn(
                name: "Model",
                table: "Vagies");

            migrationBuilder.DropColumn(
                name: "Color",
                table: "SolderBoxes");

            migrationBuilder.DropColumn(
                name: "Count",
                table: "SolderBoxes");

            migrationBuilder.DropColumn(
                name: "Color",
                table: "Screeds_480_500s");

            migrationBuilder.DropColumn(
                name: "Count",
                table: "Screeds_480_500s");

            migrationBuilder.DropColumn(
                name: "Color",
                table: "Screeds_200s");

            migrationBuilder.DropColumn(
                name: "Count",
                table: "Screeds_200s");

            migrationBuilder.DropColumn(
                name: "Contours",
                table: "Ropes");

            migrationBuilder.DropColumn(
                name: "DuplexClamps",
                table: "Ropes");

            migrationBuilder.DropColumn(
                name: "Lanyards",
                table: "Ropes");

            migrationBuilder.DropColumn(
                name: "Length",
                table: "Ropes");

            migrationBuilder.DropColumn(
                name: "Surface",
                table: "Ropes");

            migrationBuilder.DropColumn(
                name: "Thickness",
                table: "Ropes");

            migrationBuilder.DropColumn(
                name: "AstroRele",
                table: "RelaysSwitches");

            migrationBuilder.DropColumn(
                name: "PhotoRele",
                table: "RelaysSwitches");

            migrationBuilder.DropColumn(
                name: "Simple_1",
                table: "RelaysSwitches");

            migrationBuilder.DropColumn(
                name: "Simple_2",
                table: "RelaysSwitches");

            migrationBuilder.DropColumn(
                name: "WirelessWifi_1",
                table: "RelaysSwitches");

            migrationBuilder.DropColumn(
                name: "WirelessWifi_2",
                table: "RelaysSwitches");

            migrationBuilder.DropColumn(
                name: "WirelessWifi_3",
                table: "RelaysSwitches");

            migrationBuilder.DropColumn(
                name: "Wireless_1",
                table: "RelaysSwitches");

            migrationBuilder.DropColumn(
                name: "Wireless_2",
                table: "RelaysSwitches");

            migrationBuilder.DropColumn(
                name: "Wireless_3",
                table: "RelaysSwitches");

            migrationBuilder.DropColumn(
                name: "CableColor",
                table: "PvsCables");

            migrationBuilder.DropColumn(
                name: "Length",
                table: "PvsCables");

            migrationBuilder.DropColumn(
                name: "Length",
                table: "Neons");

            migrationBuilder.DropColumn(
                name: "AutotowerByHours",
                table: "Montages");

            migrationBuilder.DropColumn(
                name: "AutotowerMobileKm",
                table: "Montages");

            migrationBuilder.DropColumn(
                name: "Autotower_16_20m",
                table: "Montages");

            migrationBuilder.DropColumn(
                name: "Autotower_22_24m",
                table: "Montages");

            migrationBuilder.DropColumn(
                name: "Autotower_26_36m",
                table: "Montages");

            migrationBuilder.DropColumn(
                name: "Climber",
                table: "Montages");

            migrationBuilder.DropColumn(
                name: "MontageFringe",
                table: "Montages");

            migrationBuilder.DropColumn(
                name: "MontageNeon",
                table: "Montages");

            migrationBuilder.DropColumn(
                name: "MontageThread",
                table: "Montages");

            migrationBuilder.DropColumn(
                name: "Count",
                table: "ElectricShields");

            migrationBuilder.DropColumn(
                name: "Bracing",
                table: "Curtains");

            migrationBuilder.DropColumn(
                name: "CableColor",
                table: "Curtains");

            migrationBuilder.DropColumn(
                name: "Contours",
                table: "Curtains");

            migrationBuilder.DropColumn(
                name: "Count",
                table: "Curtains");

            migrationBuilder.DropColumn(
                name: "Extensions1m",
                table: "Curtains");

            migrationBuilder.DropColumn(
                name: "Extensions3m",
                table: "Curtains");

            migrationBuilder.DropColumn(
                name: "GlowMode",
                table: "Curtains");

            migrationBuilder.DropColumn(
                name: "GlowShade",
                table: "Curtains");

            migrationBuilder.DropColumn(
                name: "PowerUnits",
                table: "Curtains");

            migrationBuilder.DropColumn(
                name: "Size",
                table: "Curtains");

            migrationBuilder.DropColumn(
                name: "Surface",
                table: "Curtains");

            migrationBuilder.DropColumn(
                name: "Tees",
                table: "Curtains");

            migrationBuilder.DropColumn(
                name: "CableColor",
                table: "Corrugations");

            migrationBuilder.DropColumn(
                name: "Length",
                table: "Corrugations");

            migrationBuilder.DropColumn(
                name: "Thickness",
                table: "Corrugations");

            migrationBuilder.DropColumn(
                name: "Color",
                table: "BoxPvsCabels");

            migrationBuilder.DropColumn(
                name: "Length",
                table: "BoxPvsCabels");

            migrationBuilder.RenameColumn(
                name: "Plugs",
                table: "Neons",
                newName: "Lenght");

            migrationBuilder.RenameColumn(
                name: "Length",
                table: "BeltLights",
                newName: "Lenght");

            migrationBuilder.AddColumn<int>(
                name: "PowerSupplyCount",
                table: "Fringes",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}

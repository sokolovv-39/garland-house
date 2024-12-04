using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HouseGarland.DataModel.Migrations
{
    /// <inheritdoc />
    public partial class AddObjectFile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ObjectFile_FileEntities_FileEntityId",
                table: "ObjectFile");

            migrationBuilder.DropForeignKey(
                name: "FK_ObjectFile_OrderObjects_OrderObjectId",
                table: "ObjectFile");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ObjectFile",
                table: "ObjectFile");

            migrationBuilder.RenameTable(
                name: "ObjectFile",
                newName: "ObjectFiles");

            migrationBuilder.RenameIndex(
                name: "IX_ObjectFile_OrderObjectId",
                table: "ObjectFiles",
                newName: "IX_ObjectFiles_OrderObjectId");

            migrationBuilder.RenameIndex(
                name: "IX_ObjectFile_FileEntityId",
                table: "ObjectFiles",
                newName: "IX_ObjectFiles_FileEntityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ObjectFiles",
                table: "ObjectFiles",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ObjectFiles_FileEntities_FileEntityId",
                table: "ObjectFiles",
                column: "FileEntityId",
                principalTable: "FileEntities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ObjectFiles_OrderObjects_OrderObjectId",
                table: "ObjectFiles",
                column: "OrderObjectId",
                principalTable: "OrderObjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ObjectFiles_FileEntities_FileEntityId",
                table: "ObjectFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_ObjectFiles_OrderObjects_OrderObjectId",
                table: "ObjectFiles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ObjectFiles",
                table: "ObjectFiles");

            migrationBuilder.RenameTable(
                name: "ObjectFiles",
                newName: "ObjectFile");

            migrationBuilder.RenameIndex(
                name: "IX_ObjectFiles_OrderObjectId",
                table: "ObjectFile",
                newName: "IX_ObjectFile_OrderObjectId");

            migrationBuilder.RenameIndex(
                name: "IX_ObjectFiles_FileEntityId",
                table: "ObjectFile",
                newName: "IX_ObjectFile_FileEntityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ObjectFile",
                table: "ObjectFile",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ObjectFile_FileEntities_FileEntityId",
                table: "ObjectFile",
                column: "FileEntityId",
                principalTable: "FileEntities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ObjectFile_OrderObjects_OrderObjectId",
                table: "ObjectFile",
                column: "OrderObjectId",
                principalTable: "OrderObjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

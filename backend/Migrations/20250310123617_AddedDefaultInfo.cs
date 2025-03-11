using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedDefaultInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "MyInfo",
                columns: new[] { "Id", "AboutMe", "Email", "Name", "Phone", "ResumeUrl", "Title" },
                values: new object[] { 1, "", "", "", "", "", "" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MyInfo",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
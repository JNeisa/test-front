using Microsoft.EntityFrameworkCore.Migrations;

namespace Test1.Migrations
{
    public partial class CCFacatativaDBv115 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Values",
                table: "Subjects",
                newName: "HtmlValue");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "HtmlValue",
                table: "Subjects",
                newName: "Values");
        }
    }
}

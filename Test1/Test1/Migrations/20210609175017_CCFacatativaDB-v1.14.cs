using Microsoft.EntityFrameworkCore.Migrations;

namespace Test1.Migrations
{
    public partial class CCFacatativaDBv114 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Value",
                table: "Subjects",
                newName: "Values");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Values",
                table: "Subjects",
                newName: "Value");
        }
    }
}

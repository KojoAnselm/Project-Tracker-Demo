using Microsoft.EntityFrameworkCore.Migrations;

namespace Dotnetcore.Angular.TodoApp.Migrations
{
    public partial class addedhoursWorked : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "HoursWorked",
                table: "Projects",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "HoursWorked",
                table: "ProjectDetails",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HoursWorked",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "HoursWorked",
                table: "ProjectDetails");
        }
    }
}

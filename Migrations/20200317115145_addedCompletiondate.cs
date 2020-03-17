using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dotnetcore.Angular.TodoApp.Migrations
{
    public partial class addedCompletiondate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CompletedDate",
                table: "Projects",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompletedDate",
                table: "Projects");
        }
    }
}

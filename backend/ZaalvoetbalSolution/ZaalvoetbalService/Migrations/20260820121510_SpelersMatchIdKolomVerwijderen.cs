using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZaalvoetbalService.Migrations
{
    /// <inheritdoc />
    public partial class SpelersMatchIdKolomVerwijderen : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Spelers_Matchen_MatchId",
                table: "Spelers");

            migrationBuilder.DropIndex(
                name: "IX_Spelers_MatchId",
                table: "Spelers");

            migrationBuilder.DropColumn(
                name: "MatchId",
                table: "Spelers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MatchId",
                table: "Spelers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Spelers_MatchId",
                table: "Spelers",
                column: "MatchId");

            migrationBuilder.AddForeignKey(
                name: "FK_Spelers_Matchen_MatchId",
                table: "Spelers",
                column: "MatchId",
                principalTable: "Matchen",
                principalColumn: "Id");
        }
    }
}

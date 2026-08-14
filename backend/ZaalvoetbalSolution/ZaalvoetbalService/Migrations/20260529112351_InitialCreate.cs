using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZaalvoetbalService.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Matchen",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Thuisploeg = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UitPloeg = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ThuisploegScore = table.Column<int>(type: "int", nullable: false),
                    UitPloegScore = table.Column<int>(type: "int", nullable: false),
                    Uur = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Datum = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Matchen", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ploegen",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naam = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ploegen", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Doelpunten",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MatchId = table.Column<int>(type: "int", nullable: false),
                    SpelerNaam = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Doelpunten", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Doelpunten_Matchen_MatchId",
                        column: x => x.MatchId,
                        principalTable: "Matchen",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Kaarten",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MatchId = table.Column<int>(type: "int", nullable: false),
                    SpelerNaam = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Kleur = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ploeg = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kaarten", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Kaarten_Matchen_MatchId",
                        column: x => x.MatchId,
                        principalTable: "Matchen",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Stemmen",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MatchId = table.Column<int>(type: "int", nullable: false),
                    SpelerNaam = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ploeg = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stemmen", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stemmen_Matchen_MatchId",
                        column: x => x.MatchId,
                        principalTable: "Matchen",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Spelers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naam = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PloegId = table.Column<int>(type: "int", nullable: false),
                    MatchId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spelers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Spelers_Matchen_MatchId",
                        column: x => x.MatchId,
                        principalTable: "Matchen",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Spelers_Ploegen_PloegId",
                        column: x => x.PloegId,
                        principalTable: "Ploegen",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Doelpunten_MatchId",
                table: "Doelpunten",
                column: "MatchId");

            migrationBuilder.CreateIndex(
                name: "IX_Kaarten_MatchId",
                table: "Kaarten",
                column: "MatchId");

            migrationBuilder.CreateIndex(
                name: "IX_Spelers_MatchId",
                table: "Spelers",
                column: "MatchId");

            migrationBuilder.CreateIndex(
                name: "IX_Spelers_PloegId",
                table: "Spelers",
                column: "PloegId");

            migrationBuilder.CreateIndex(
                name: "IX_Stemmen_MatchId",
                table: "Stemmen",
                column: "MatchId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Doelpunten");

            migrationBuilder.DropTable(
                name: "Kaarten");

            migrationBuilder.DropTable(
                name: "Spelers");

            migrationBuilder.DropTable(
                name: "Stemmen");

            migrationBuilder.DropTable(
                name: "Ploegen");

            migrationBuilder.DropTable(
                name: "Matchen");
        }
    }
}

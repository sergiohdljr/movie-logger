-- AlterTable
ALTER TABLE "User" ADD COLUMN "avatar" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Log" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rating" INTEGER NOT NULL,
    "review" TEXT NOT NULL,
    "had_watched_before" BOOLEAN NOT NULL,
    "movie_watched_date" DATETIME NOT NULL,
    "like" BOOLEAN NOT NULL,
    "contain_spoilers" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,
    "movieId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Log_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Log" ("contain_spoilers", "had_watched_before", "id", "like", "movieId", "movie_watched_date", "rating", "review", "userId") SELECT "contain_spoilers", "had_watched_before", "id", "like", "movieId", "movie_watched_date", "rating", "review", "userId" FROM "Log";
DROP TABLE "Log";
ALTER TABLE "new_Log" RENAME TO "Log";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

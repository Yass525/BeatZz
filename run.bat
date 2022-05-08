set type=%1

IF "%type%" EQU "install" (
    set command=npm install
) ELSE (
    set command=npm run %type%
)

IF "%type%" EQU "" (
    set command=npm run dev
)

start cmd /k "cd server/services/aggregator && %command%  && exit && TITLE gateway"
start cmd /k "cd server/services/auth && %command% && exit"
start cmd /k "cd server/services/room && %command% && exit"
start cmd /k "cd server/services/user && %command% && exit"
start cmd /k "cd server/services/streaming && %command% && exit"
start cmd /k "cd client && %command% && exit"
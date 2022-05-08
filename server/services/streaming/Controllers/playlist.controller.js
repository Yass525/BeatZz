const Playlist = require("../../../models/Playlist");
const Song = require("../../../models/Song");
const User = require('../../../models/User')

module.exports = {
    create: async (req, res) => {

        let playlist = new Playlist({
            ...req.body
        });
        await playlist.save();

        res.status(200).json({
            success: true,
            message: "Playlist Created",
            Playlist: playlist
        });
    },
    update: async (req, res) => {

        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) return res.status(404).json({
            success: false,
            message: "Playlist not found"
        });
        await playlist.set(req.body)
        await playlist.save();
        res.status(200).json({
            success: true,
            Message: 'Playlist Updated',
            Playlist: playlist
        })
    },
    delete: async (req, res) => {
        const playlist = await Playlist.findById(req.params.id);
        console.log(playlist)
        if (!playlist) return res.status(404).json({
            success: false,
            message: "Playlist not found"
        });
        await playlist.remove();
        res.status(200).json({
            success: true,
            message: "Playlist Deleted",
            Playlist: playlist
        });
    },
    getAll: async (req, res) => {
        const playlists = await Playlist.find({ scope: 'PUBLIC' });
        if (playlists.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No Playlists available'
            });
        }
        res.status(200).json({
            success: true,
            PlaylistsFound: playlists.length,
            Playlists: playlists
        });
    },
    getUserPlaylists: async (req, res) => {
        if (!req.params.idUser || req.params.idUser == "undefined") return res.status(200).json({
            success: true,
            message: 'No Playlists available'
        });

        const playlists = await Playlist.find({ user: req.params.idUser });
        if (playlists.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No Playlists available'
            });
        }
        res.status(200).json({
            success: true,
            PlaylistsFound: playlists.length,
            Playlists: playlists
        });
    },

    getFollowsPlaylists: async (req, res) => {
        try {
            const user = await User.findById(req.params['idUser'])
            if (!user) throw createError.BadRequest("User not found")

            const follows = await Promise.all(
                user.follows.map((followerId) => {
                    return User.findById(followerId);
                })
            );

            let playlist = await Promise.all(
                follows.map((follows) => {
                    console.log("1")
                    const { _id } = follows;
                    return Playlist.find({ user: _id, scope:'FRIENDS_ONLY' });

                })
            )

            var playlist2 = [].concat(...playlist)

            console.log("2")
            console.log(playlist2)
            res.status(200).json({
                success: true,
                Playlists: playlist2
            });

        } catch (err) {
            res.status(500).json(err.message);
        }
    },
    getOne: async (req, res) => {
        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) return res.status(404).json({
            success: false,
            message: "Playlist not found"
        });
        for (const songId of playlist.songs) {
            const song = await Song.findById(songId);
            if (!song) {
                playlist.songs.splice(playlist.songs.indexOf(songId), 1)
                await playlist.save();
            }
        }

        res.status(200).json({
            success: true,
            Playlist: playlist
        });
    },
    addSong: async (req, res) => {
        console.log(req.params.playlistId)
        const playlist = await Playlist.findById(req.params.playlistId);
        const song = await Song.findById(req.body.songId);
        if (!playlist) return res.status(404).json({
            success: false,
            message: "Playlist not found"
        });
        if (!song) return res.status(404).json({
            success: false,
            message: "Song not found"
        });
        if (playlist.songs.indexOf(req.body.songId) === -1) {
            playlist.songs.push(req.body.songId);
        } else {
            return res.status(404).json({
                success: false,
                message: "Song already added to this playlist"
            });
        }
        await playlist.save();
        res.status(200).json({
            success: true,
            Message: 'Playlist Updated, Added 1 Song',
            Playlist: playlist
        })
    },
    removeSong: async (req, res) => {
        const playlist = await Playlist.findById(req.params.playlistId);
        const song = await Song.findById(req.body.songId);

        if (!playlist) return res.status(404).json({
            success: false,
            message: "Playlist not found"
        });
        if (!song) return res.status(404).json({
            success: false,
            message: "Song not found"
        });
        if (playlist.songs.indexOf(req.body.songId) === -1) {
            return res.status(404).json({
                success: false,
                message: "Song already not added to this playlist"
            });
        }
        const index = playlist.songs.indexOf(req.body.songId);
        playlist.songs.splice(index, 1);
        await playlist.save();

        res.status(200).json({
            success: true,
            Message: 'Playlist Updated, Removed 1 Song',
            Playlist: playlist
        });
    },
    getPlaylistSongs: async (req, res) => {
        const playlist = await Playlist.findById(req.params.playlistId);
        if (!playlist) return res.status(404).json({
            success: false,
            message: "Playlist not found"
        });
        let songs = [];
        for (const songId of playlist.songs) {
            const song = await Song.findById(songId);
            songs.push(song);
            if (!song) {
                songs.pop();
            }
        }
        res.status(200).json({
            success: true,
            SongsFound: songs.length,
            PlaylistSongs: songs
        });
    },
    likePlaylist: async (req, res) => {
        const playlist = await Playlist.findById(req.params.playlistId);
        if (!playlist) {
            return res.status(404).json({
                success: false,
                message: 'Playlist Not Found'
            });
        }
        playlist.nbrLikes += 1;
        await playlist.save();
        res.status(200).json({
            success: true,
            message: 'like added',
            Playlist: playlist.title,
            Likes: playlist.nbrLikes
        });
    },
    dislikePlaylist: async (req, res) => {
        const playlist = await Playlist.findById(req.params.playlistId);
        if (!playlist) {
            return res.status(404).json({
                success: false,
                message: 'Playlist Not Found'
            });
        }
        playlist.nbrLikes -= 1;
        await playlist.save();
        res.status(200).json({
            success: true,
            message: 'dislike added',
            Playlist: playlist.title,
            Likes: playlist.nbrLikes
        });
    }
}

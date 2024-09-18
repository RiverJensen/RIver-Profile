import {User} from '../database/model.js';

const user = await User.findAll({
    where: {
        userId: req.body.userId,
        username: req.body.username,
        score: req.body.score,
    }
});

await db.close();
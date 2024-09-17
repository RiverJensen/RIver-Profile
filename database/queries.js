import {User} from '../database/model.js';

const user = await User.findone({
    where: {
        userId: req.body.userId,
        username: req.body.username,
    }
});

await db.close();
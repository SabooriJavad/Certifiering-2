import { Request, Response, Router } from 'express';
import { EventModel } from '../models/event-model';
import { UserModel } from '../models/user-model';

export const eventRouter = Router();


eventRouter.post('/', async (req: Request, res: Response) => {
    try{
        const event = await EventModel.create(req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create event' });
    }
    
});

eventRouter.get('/', async(req: Request, res: Response) => {
    try {
        const events = await EventModel.find().populate('participants', 'username email ');
        // console.log('Fetched events:', JSON.stringify(events, null, 2));
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }

});


eventRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const updated = await EventModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) {
            res.status(404).json({ error: 'Event not found' });
         
        }
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update event' });
    }
});


eventRouter.delete('/:id', async (req: Request, res: Response) => {

    try {
        const deleted = await EventModel.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ error: 'Event not found' });
        
        }
        res.json({ message: 'Event deleted' });

    } catch (error) {
        res.status(500).json({ error: 'Failed to delete event' });

    }
    
});



eventRouter.post('/:id/participants', async (req: Request, res: Response) => {
    
    const { userId } = req.body;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            
        }

        const event = await EventModel.findById(req.params.id);
        if (!event) {
            res.status(404).json({ error: 'Event not found' });

        }
        if (event.participants.length >= 10) {
            res.status(400).json({error:'Maximum number of participants reached'})
            
        }
            const updatedEvent = await EventModel.findByIdAndUpdate(
                req.params.id,
                { $addToSet: { participants: userId } },
                { new: true }
            );
            if (!event) {
                res.status(404).json({ error: 'Event not founs' });
            }
            res.json(event);
        }catch (error) {
        res.status(500).json({ error: 'Failed to add participants' });
    }
});


eventRouter.delete('/:id/participants/:userId', async (req: Request, res: Response) => {
    const { id, userId } = req.params;
    try {
        const event = await EventModel.findByIdAndUpdate(
            id,
            { $pull: { participants: userId } },
            { new: true }
        );
        if (!event) {
            res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove particicpant' });
    }

});




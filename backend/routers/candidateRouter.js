const router = require('express').Router();
const { authMiddleware } = require('../authMiddleware');
const Candidate = require('../models/Candidate');
const User = require('../models/User');

const checkAdminRole = async (userID) => {
    try {
        const user = await User.findById(userID);
        return user.role === 'admin';
    } catch (error) {
        console.error('Error checking admin role:', error);
        return false;
    }
};


router.post('/',authMiddleware, async (req, res) => {
    const candidateData = req.body;
    try{
        if(!await checkAdminRole(req.user.id)){
            return res.status(403).send({ message: 'Access denied. Admins only.' });
        }
        const newCandidate = new Candidate(candidateData);
        const response = await newCandidate.save();
        console.log('Candidate created successfully');
        res.status(201).send({ message: 'Candidate created successfully', candidate: response });
    }catch(error){
        console.error('Error creating candidate:', error);
        res.status(500).send({ message: 'Error creating candidate', error: error });
    }
});

router.put('/:candidateID', authMiddleware,async (req, res) => {
    const candidateID = req.params.candidateID;
    const updateData = req.body;
    try{
        if(!await checkAdminRole(req.user.id)){
            return res.status(403).send({ message: 'Access denied. Admins only.' });
        }
        const updatedCandidate = await Candidate.findByIdAndUpdate(candidateID, updateData);
        if(!updatedCandidate){
            return res.status(404).send({ message: 'Candidate not found' });
        }
        console.log('Candidate updated successfully');
        res.status(200).send({ message: 'Candidate updated successfully', candidate: updatedCandidate });
    }catch(error){
        console.error('Error updating candidate:', error);
        res.status(500).send({ message: 'Error updating candidate', error: error });
    }
});

router.delete('/:candidateID',authMiddleware, async (req, res) => {
    const candidateID = req.params.candidateID;
    try{
        if(!await checkAdminRole(req.user.id)){
            return res.status(403).send({ message: 'Access denied. Admins only.' });
        }
        const deletedCandidate = await Candidate.findByIdAndDelete(candidateID);
        if(!deletedCandidate){
            return res.status(404).send({ message: 'Candidate not found' });
        }
        console.log('Candidate deleted successfully');
        res.status(200).send({ message: 'Candidate deleted successfully', candidate: deletedCandidate });
    }
    catch(error){
        console.error('Error deleting candidate:', error);
        res.status(500).send({ message: 'Error deleting candidate', error: error });
    }
});

router.get('/', authMiddleware,async (req, res) => {
    try{
        const candidates = await Candidate.find();
        console.log('Candidates fetched successfully');
        res.status(200).send({ message: 'Candidates fetched successfully', candidates: candidates });
    }
    catch(error){
        console.error('Error fetching candidates:', error);
        res.status(500).send({ message: 'Error fetching candidates', error: error });
    }
});


router.post('/vote/:candidateID',authMiddleware, async (req, res) => {
    const candidateID = req.params.candidateID;
    const userID = req.user.id;
    try{
        const user = await User.findById(userID);
        if(user.isVoted){
            return res.status(400).send({ message: 'User has already voted' }); 
        }
        if(!user){
            return res.status(404).send({ message: 'User not found' });
        }
        if(user.role !== 'user'){
            return res.status(403).send({ message: 'Only users can vote' });
        }

        const candidate = await Candidate.findById(candidateID);

        candidate.votes.push({user:userID});
        candidate.voteCount++;
        await candidate.save();

        user.isVoted = true;
        await user.save();

        console.log('Vote cast successfully');
        res.status(200).send({ message: 'Vote cast successfully', candidate: candidate });
    }catch(error){
        console.error('Error casting vote:', error);
        res.status(500).send({ message: 'Error casting vote', error: error });
    }
});


router.get('/vote/count', authMiddleware, async (req, res) => {
    try{
        const candidates = await Candidate.find().sort({ voteCount:'desc'});
        const records = candidates.map((data) => {
            return {
                party : data.party,
                voteCount : data.votes
            };
        });
        res.status(200).send({ message: 'Vote counts fetched successfully', voteCounts: records });
    }catch(error){
        console.error('Error fetching vote counts:', error);
        res.status(500).send({ message: 'Error fetching vote counts', error: error });
    }
});



module.exports = router;
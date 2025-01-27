const Investor = require('../models/Investor');

const enumData = {
  meansOfContact: ['Social media ads', 'Referral', 'In-person'],
  temperatureLevel: ['Hot', 'Warm', 'Cold'],
};

exports.homepage = async (req, res) => {
  const messages = await req.flash('info');

  const locals = {
    title: 'NCDF Investor',
    description: 'NCDF Investors Management System',
  };

  let perPage = 5;
  let page = req.query.page || 1;

  try {
    const investors = await Investor.aggregate([{ $sort: { createdAt: 1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Investor.countDocuments({});

    res.render('index', {
      locals,
      investors,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.about = async (_req, res) => {
  const locals = {
    title: 'About',
    description: 'NCDF Investors Management System',
  };

  try {
    res.render('about', locals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addInvestor = async (_req, res) => {
  const locals = {
    title: 'Add New Investor',
    description: 'NCDF Investors Management System',
  };

  res.render('investor/add', {
    locals,
    enumData,
  });
};

exports.postInvestor = async (req, res) => {
  const {
    title,
    firstName,
    lastName,
    phoneNumber,
    email,
    organization,
    sector,
    meansOfContact,
    registered,
    committed,
    eventAttended,
    progressUpdate,
    temperatureLevel,
  } = req.body;

  const newInvestor = new Investor({
    title,
    firstName,
    lastName,
    phoneNumber,
    email,
    organization,
    sector,
    meansOfContact,
    registered,
    committed,
    eventAttended,
    progressUpdate,
    temperatureLevel,
  });

  try {
    await Investor.create(newInvestor);
    await req.flash('info', 'New Investor has been added');

    res.redirect('/');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.view = async (req, res) => {
  try {
    const investor = await Investor.findOne({ _id: req.params.id });

    const locals = {
      title: 'View Investor Data',
      description: 'NCDF Investors Management System',
    };

    res.render('investor/view', { locals, investor });
    // res.json({ locals, investor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.edit = async (req, res) => {
  try {
    const investors = await Investor.findOne({ _id: req.params.id });

    const locals = {
      title: 'Edit Investor Data',
      description: 'NCDF Investors Management System',
    };

    res.render('investor/edit', { locals, investors, enumData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.editPost = async (req, res) => {
  try {
    await Investor.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      organization: req.body.organization,
      registered: req.body.registered,
      committed: req.body.committed,
      eventAttended: req.body.eventAttended,
      progressUpdate: req.body.progressUpdate,
      meansOfContact: req.body.meansOfContact,
      temperatureLevel: req.body.temperatureLevel,
    });

    await res.redirect(`/edit/${req.params.id}`);
    console.log('redirected');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteInvestor = async (req, res) => {
  try {
    await Investor.deleteOne({ _id: req.params.id });
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchInvestors = async (req, res) => {
  const locals = {
    title: 'Search Investors Data',
    description: 'NCDF Investors Management System',
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '');

    const investors = await Investor.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { firstName: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { phoneNumber: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { email: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
      ],
    });

    res.render('search', {
      investors,
      locals,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

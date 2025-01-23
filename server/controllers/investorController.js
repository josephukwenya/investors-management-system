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

  let perPage = 10;
  let page = req.query.page || 1;

  try {
    const investors = await Investor.aggregate([{ $sort: { createdAt: -1 } }])
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
    console.log(error);
  }
};

exports.about = async (req, res) => {
  const locals = {
    title: 'About',
    description: 'NCDF Investors Management System',
  };

  try {
    res.render('about', locals);
  } catch (error) {
    console.log(error);
  }
};

exports.addInvestor = async (req, res) => {
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

  // const investor = await Investor.find({ email });

  // if (investor) {
  //   return new Error('Investor already exist', 404);
  // }

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
    console.log(error);
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
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

exports.deleteInvestor = async (req, res) => {
  try {
    await Investor.deleteOne({ _id: req.params.id });
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};

exports.searchInvestors = async (req, res) => {
  const locals = {
    title: 'Search Customer Data',
    description: 'NCDF Investors Management System',
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '');

    const investors = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
      ],
    });

    res.render('search', {
      investors,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};

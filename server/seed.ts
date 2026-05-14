import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from './config/database';
import { AdminUser } from './models/admin-user.model';
import { Profile } from './models/profile.model';
import { ContactPage } from './models/contact-page.model';

async function seed(): Promise<void> {
  await connectDB();

  // Create admin user if not exists
  const email = process.env['ADMIN_EMAIL'] ?? 'admin@example.com';
  const password = process.env['ADMIN_PASSWORD'] ?? 'changeme';
  const existing = await AdminUser.findOne({ email });
  if (!existing) {
    const passwordHash = await bcrypt.hash(password, 12);
    await AdminUser.create({ email, passwordHash });
    console.log(`Admin user created: ${email}`);
  } else {
    console.log(`Admin user already exists: ${email}`);
  }

  // Seed profile if empty
  const profile = await Profile.findOne();
  if (!profile) {
    await Profile.create({
      name: 'John Tuza',
      firstName: 'John',
      lastName: 'Tuza',
      latestWorkPosition: 'Full Stack Developer',
      shortResume: 'I am a software engineer passionate about building great products.',
      imageUrl: '',
      address: '',
      primaryPhoneNumber: '',
      skype: '',
      languages: 'English',
      nationality: '',
      cvUrl: ''
    });
    console.log('Default profile created.');
  }

  // Seed contact page if empty
  const contact = await ContactPage.findOne();
  if (!contact) {
    await ContactPage.create({
      pageHeaderForeground: 'Get in touch',
      pageHeaderBackground: 'Contact',
      descriptionIntro: 'Don\'t be shy!',
      descriptionLongContent: 'Feel free to get in touch with me. I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.',
      contactDetails: [
        { title: 'Email', text: 'johntuza94@gmail.com', iconRef: 'envelope', isActive: true }
      ],
      formLabels: [
        { title: 'Name', placeholder: 'Your Name' },
        { title: 'Email', placeholder: 'Your Email' },
        { title: 'Subject', placeholder: 'Subject' },
        { title: 'Message', placeholder: 'Your Message' }
      ],
      socials: [
        { url: 'https://github.com', title: 'GitHub', iconRef: 'github', isActive: true },
        { url: 'https://linkedin.com', title: 'LinkedIn', iconRef: 'linkedin', isActive: true }
      ]
    });
    console.log('Default contact page created.');
  }

  console.log('Seed complete.');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });

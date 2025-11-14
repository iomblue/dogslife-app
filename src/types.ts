// General App Navigation
export type Screen = 'Home' | 'Health' | 'Fitness' | 'Training' | 'Profile' | 'Settings' | 'Community' | 'Journal' | 'Map' | 'Services' | 'Playdates' | 'Expenses' | 'Nutrition';
export type UnitSystem = 'metric' | 'imperial';

// Health / Symptom Checker
export enum UrgencyLevel {
  URGENT = 'Immediate veterinary attention required',
  CONTACT_VET = 'Contact your vet for advice',
  MONITOR = 'Monitor at home, contact vet if symptoms worsen',
}

export interface SymptomAnalysis {
  urgency: UrgencyLevel;
  potentialCauses: string[];
  redFlags: string[];
  clarifyingQuestions: string[];
}

export interface SymptomAnalysisHistoryItem extends SymptomAnalysis {
    id: string;
    date: string;
    symptoms: string;
}

// Medical Records
export enum MedicalRecordType {
    VET_VISIT = 'Vet Visit',
    VACCINATION = 'Vaccination',
    MEDICATION = 'Medication',
}

export interface MedicalRecord {
    id: string;
    type: MedicalRecordType;
    date: string; // ISO string format
    title: string;
    details: string;
    dueDate?: string; // ISO string format for reminders
}

// User Profile
export interface OwnerProfile {
    name: string;
    town: string;
    photoUrl: string;
}

// Dog Profile
export interface DogProfile {
  name: string;
  breed: string;
  dob: string; // date string
  sex: 'Male' | 'Female';
  imageUrl: string;
  temperament: Temperament[];
  owner: OwnerProfile;
}

// Fitness / Walks
export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface Walk {
  id: string;
  date: string;
  duration: number; // in seconds
  distance: number; // in km
  route: GeoLocation[];
  avgSpeed?: number; // in km/h
}

// Training
export type TrainingGoal = 'sit' | 'stay' | 'come' | 'leash';

export enum Temperament {
    CALM = 'Calm',
    ENERGETIC = 'Energetic',
    FRIENDLY = 'Friendly',
    SHY = 'Shy',
    PROTECTIVE = 'Protective',
}

export interface TrainingStep {
  title: string;
  description: string;
  duration: string;
}

export interface TrainingPlan {
  goal: string;
  duration: string;
  steps: TrainingStep[];
}

// Journal
export interface JournalEntry {
    id: string;
    date: string;
    imageUrl: string;
    caption: string;
}

// Community
export interface CommunityPost {
    id: string;
    author: string;
    avatarUrl: string;
    date: string;
    text: string;
}

// Lost Dog Alerts
export interface LostDogAlert {
    id: string;
    dogName: string;
    dogImage: string;
    lastSeenLocation: GeoLocation;
    date: string; // ISO string
    status: 'active' | 'found';
}

// Nutrition
export interface FeedingScheduleItem {
    id: string;
    time: string; // e.g., "08:00"
    food: string;
    portion: string;
}

export interface WeightRecord {
    id: string;
    date: string; // ISO string
    weight: number; // in kg
}

// Expenses
export enum ExpenseCategory {
    FOOD = 'Food',
    VET = 'Vet',
    MEDICATION = 'Medication',
    GROOMING = 'Grooming',
    TOYS = 'Toys',
    TRAINING = 'Training',
    OTHER = 'Other',
}

export interface Expense {
    id: string;
    date: string; // ISO string
    category: ExpenseCategory;
    amount: number;
    notes?: string;
}

// Services
export enum ServiceType {
    VET = 'Vet',
    PARK = 'Park',
    GROOMER = 'Groomer',
    TRAINER = 'Trainer',
    BOARDING = 'Boarding',
}

export interface DogService {
    id: string;
    name: string;
    type: ServiceType;
    location: GeoLocation;
    rating: number;
}

// Playdates
export enum DogSize {
    SMALL = 'Small',
    MEDIUM = 'Medium',
    LARGE = 'Large',
}

export enum PlayStyle {
    GENTLE = 'Gentle',
    ROUGH_AND_TUMBLE = 'Rough and Tumble',
    CHASER = 'Chaser',
    WRESTLER = 'Wrestler',
}

export interface PlaydateProfile {
    id: string;
    dogName: string;
    dogImage: string;
    breed: string;
    age: number;
    size: DogSize;
    temperament: Temperament[];
    playStyle: PlayStyle;
    ownerName: string;
    ownerImage: string;
}

export interface ChatMessage {
    id: string;
    text: string;
    sender: 'me' | 'them';
    timestamp: string;
}

export interface PlaydateMatch {
    id: string;
    myDogProfile: PlaydateProfile;
    theirDogProfile: PlaydateProfile;
    messages: ChatMessage[];
    lastMessageTimestamp: number;
}


// Theme
export type ThemeName = 'trustCare' | 'playfulSocial' | 'naturalCalm';
export type ColorMode = 'light' | 'dark' | 'system';

export interface Theme {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
  muted: string;
  mutedForeground: string;
}

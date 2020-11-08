import {
  BuilderContext,
  Agent,
  DialogContext,
  Event,
  DialogEngine,
  Block,
  CompoundBlock,
  WhenBlock,
  GotoStateBlock,
  CustomBlock,
} from "@chitchatjs/core";
import { Directive, RequestEnvelope, ResponseEnvelope } from "ask-sdk-model";

import { v1 } from "ask-smapi-model";

/**
 * Type aliases
 */
export type SkillManifestEnvelope = v1.skill.Manifest.SkillManifestEnvelope;
export type InteractionModel = v1.skill.interactionModel.InteractionModelData;
export type Intent = v1.skill.interactionModel.Intent;
export type Slot = v1.skill.interactionModel.SlotDefinition;
export type SlotType = v1.skill.interactionModel.SlotType;
export type SlotTypeValue = v1.skill.interactionModel.TypeValue;
export interface SlotValue {
  id?: string;
  value: string;
  synonyms: string[];
}
export type LocalizedSkillInfo = v1.skill.Manifest.SkillManifestLocalizedPublishingInformation;
export type AlexaBlock = Block<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>;
export type AlexaDialogEngine = DialogEngine<
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent
>;
export type Skill = Agent<AlexaBuilderContext, AlexaDialogContext, AlexaEvent>;

/**
 * Beginning state name
 */
export const INITIAL_STATE_NAME: string = "__INIT__";

export enum Locale {
  en_AU = "en-AU",
  en_CA = "en-CA",
  en_GB = "en-GB",
  en_IN = "en-IN",
  en_US = "en-US",
  de_DE = "de-DE",
  es_ES = "es-ES",
  es_MX = "es-MX",
  es_US = "es-US",
  fr_CA = "fr-CA",
  fr_FR = "fr-FR",
  hi_IN = "hi-IN",
  it_IT = "it-IT",
  ja_JP = "ja-JP",
  pt_BR = "pt-BR",
}
export const DEFAULT_LOCALE = Locale.en_US;

export namespace ssml {
  /**
   * Ref - https://developer.amazon.com/en-US/docs/alexa/custom-skills/speech-synthesis-markup-language-ssml-reference.html#voice
   */
  export enum Voice {
    Ivy = "Ivy",
    Joanna = "Joanna",
    Joey = "Joey",
    Justin = "Justin",
    Kendra = "Kendra",
    Kimberly = "Kimberly",
    Matthew = "Matthew",
    Salli = "Salli",
    Nicole = "Nicole",
    Russell = "Russell",
    Amy = "Amy",
    Brian = "Brian",
    Emma = "Emma",
    Raveena = "Raveena",
    Chantal = "Chantal",
    Celine = "Celine",
    Lea = "Lea",
    Mathieu = "Mathieu",
    Hans = "Hans",
    Marlene = "Marlene",
    Vicki = "Vicki",
    Aditi = "Aditi",
    Carla = "Carla",
    Giorgio = "Giorgio",
    Bianca = "Biance",
    Mizuki = "Mizuki",
    Takumi = "Takumi",
    Vitoria = "Victoria",
    Camila = "Camila",
    Ricardo = "Ricardo",
    Penelope = "Penelope",
    Lupe = "Lupe",
    Miguel = "Miguel",
    Conchita = "Conchita",
    Enrique = "Enrique",
    Lucia = "Lucia",
    Mia = "Mia",
  }

  export enum Domain {
    conversational = "conversational",
    long_form = "long-form",
    music = "music",
    news = "news",
  }

  export enum Effect {
    whispered = "whispered",
  }

  export enum Emotion {
    excited = "excited",
    disappointed = "disappointed",
  }

  export enum Intensity {
    low = "low",
    medium = "medium",
    high = "high",
  }

  export enum BreakStrength {
    none = "none",
    x_weak = "x-weak",
    weak = "weak",
    medium = "medium",
    strong = "strong",
    x_strong = "x-strong",
  }

  export enum EmphasisLevel {
    strong = "strong",
    moderate = "moderate",
    reduced = "reduced",
  }

  export enum PhoneticAlphabet {
    ipa = "ipa",
    x_sampe = "x-sampe",
  }

  export enum Volume {
    silent = "silent",
    x_soft = "x-soft",
    soft = "soft",
    medium = "medium",
    loud = "loud",
    x_loud = "x-loud",
  }

  export enum Pitch {
    x_low = "x-low",
    low = "low",
    medium = "medium",
    high = "high",
    x_high = "x-high",
  }

  export enum Rate {
    x_slow = "x-slow",
    slow = "slow",
    medium = "medium",
    fast = "fast",
    x_fast = "x-fast",
  }

  export enum Interpreters {
    characters = "characters",
    spell_out = "spell-out",
    cardinal = "cardinal",
    number = "number",
    ordinal = "ordinal",
    digits = "digits",
    fraction = "fraction",
    unit = "unit",
    date = "date",
    time = "time",
    telephone = "telephone",
    address = "address",
    interjection = "interjection",
    expletive = "expletive",
  }

  export enum DateInterpreterFormat {
    mdy = "mdy",
    dmy = "dmy",
    ymd = "ymd",
    md = "md",
    dm = "dm",
    ym = "ym",
    my = "my",
    d = "d",
    m = "m",
    y = "y",
  }

  export enum WordRole {
    vb = "amazon:VB",
    vbd = "amazon:VBD",
    nn = "amazon:NN",
    sense_1 = "amazon:SENSE_1",
  }
}

/**
 * Support builtins
 */
export namespace builtins {
  /**
   * Type safe builtin slot types
   */
  export enum SlotType {
    /**
     * Resolver/formatter slot types
     */
    Date = "AMAZON.DATE",
    Duration = "AMAZON.DURATION",
    FourDigitNumber = "AMAZON.FOUR_DIGIT_NUMBER",
    Number = "AMAZON.NUMBER",
    Ordinal = "AMAZON.Ordinal",
    PhoneNumber = "AMAZON.PhoneNumber",
    Time = "AMAZON.TIME",

    /**
     * Phrases
     */
    SearchQuery = "AMAZON.SearchQuery",

    /**
     * List based types
     */
    Actor = "AMAZON.Actor",
    AdministrativeArea = "AMAZON.AdministrativeArea",
    AggregateRating = "AMAZON.AggregateRating",
    Airline = "AMAZON.Airline",
    Airport = "AMAZON.Airport",
    Anaphor = "AMAZON.Anaphor",
    Animal = "AMAZON.Animal",
    Artist = "AMAZON.Artist",
    AT_CITY = "AMAZON.AT_CITY",
    AT_REGION = "AMAZON.AT_REGION",
    Athlete = "AMAZON.Athlete",
    Author = "AMAZON.Author",
    Book = "AMAZON.Book",
    BookSeries = "AMAZON.BookSeries",
    BroadcastChannel = "AMAZON.BroadcastChannel",
    City = "AMAZON.City",
    CivicStructure = "AMAZON.CivicStructure",
    Color = "AMAZON.Color",
    Comic = "AMAZON.Comic",
    Corporation = "AMAZON.Corporation",
    Country = "AMAZON.Country",
    CreativeWorkType = "AMAZON.CreativeWorkType",
    DayOfWeek = "AMAZON.DayOfWeek",
    DE_CITY = "AMAZON.DE_CITY",
    DE_FIRST_NAME = "AMAZON.DE_FIRST_NAME",
    DE_REGION = "AMAZON.DE_REGION",
    Dessert = "AMAZON.Dessert",
    DeviceType = "AMAZON.DeviceType",
    Director = "AMAZON.Director",
    Drink = "AMAZON.Drink",
    EducationalOrganization = "AMAZON.EducationalOrganization",
    EUROPE_CITY = "AMAZON.EUROPE_CITY",
    EventType = "AMAZON.EventType",
    Festival = "AMAZON.Festival",
    FictionalCharacter = "AMAZON.FictionalCharacter",
    FinancialService = "AMAZON.FinancialService",
    FirstName = "AMAZON.FirstName",
    Food = "AMAZON.Food",
    FoodEstablishment = "AMAZON.FoodEstablishment",
    Game = "AMAZON.Game",
    GB_CITY = "AMAZON.GB_CITY",
    GB_FIRST_NAME = "AMAZON.GB_FIRST_NAME",
    GB_REGION = "AMAZON.GB_REGION",
    Genre = "AMAZON.Genre",
    Landform = "AMAZON.Landform",
    LandmarksOrHistoricalBuildings = "AMAZON.LandmarksOrHistoricalBuildings",
    Language = "AMAZON.Language",
    LocalBusiness = "AMAZON.LocalBusiness",
    LocalBusinessType = "AMAZON.LocalBusinessType",
    MedicalOrganization = "AMAZON.MedicalOrganization",
    Month = "AMAZON.Month",
    Movie = "AMAZON.Movie",
    MovieSeries = "AMAZON.MovieSeries",
    MovieTheater = "AMAZON.MovieTheater",
    MusicAlbum = "AMAZON.MusicAlbum",
    MusicCreativeWorkType = "AMAZON.MusicCreativeWorkType",
    MusicEvent = "AMAZON.MusicEvent",
    MusicGroup = "AMAZON.MusicGroup",
    Musician = "AMAZON.Musician",
    MusicPlaylist = "AMAZON.MusicPlaylist",
    MusicRecording = "AMAZON.MusicRecording",
    MusicVenue = "AMAZON.MusicVenue",
    MusicVideo = "AMAZON.MusicVideo",
    Organization = "AMAZON.Organization",
    Person = "AMAZON.Person",
    PostalAddress = "AMAZON.PostalAddress",
    Professional = "AMAZON.Professional",
    ProfessionalType = "AMAZON.ProfessionalType",
    RadioChannel = "AMAZON.RadioChannel",
    Region = "AMAZON.Region",
    RelativePosition = "AMAZON.RelativePosition",
    Residence = "AMAZON.Residence",
    Room = "AMAZON.Room",
    ScreeningEvent = "AMAZON.ScreeningEvent",
    Service = "AMAZON.Service",
    SocialMediaPlatform = "AMAZON.SocialMediaPlatform",
    SoftwareApplication = "AMAZON.SoftwareApplication",
    SoftwareGame = "AMAZON.SoftwareGame",
    Sport = "AMAZON.Sport",
    SportsEvent = "AMAZON.SportsEvent",
    SportsTeam = "AMAZON.SportsTeam",
    StreetAddress = "AMAZON.StreetAddress",
    StreetName = "AMAZON.StreetName",
    TelevisionChannel = "AMAZON.TelevisionChannel",
    TVEpisode = "AMAZON.TVEpisode",
    TVSeason = "AMAZON.TVSeason",
    TVSeries = "AMAZON.TVSeries",
    US_CITY = "AMAZON.US_CITY",
    US_FIRST_NAME = "AMAZON.US_FIRST_NAME",
    US_STATE = "AMAZON.US_STATE",
    VideoGame = "AMAZON.VideoGame",
    VisualModeTrigger = "AMAZON.VisualModeTrigger",
    WeatherCondition = "AMAZON.WeatherCondition",
    WrittenCreativeWorkType = "AMAZON.WrittenCreativeWorkType",
  }
}

export interface AlexaDialogContext extends DialogContext {
  currentResponse: ResponseEnvelope;
  currentLocales?: Locale[];
}

export interface AlexaBuilderContext extends BuilderContext {
  currentLocales?: Locale[];
}

export interface AlexaEvent extends Event {
  currentRequest: RequestEnvelope;
}

/**
 * Alexa specific blocks
 */
export interface SkillInfoBlock extends AlexaBlock {
  type: "SkillInfoBlock";
  skillName: string;
  invocationName: string;
  smallIconUri?: string;
  largeIconUri?: string;
  summary?: string;
  description?: string;
  updatesDescription?: string;
  examplePhrases?: string[];
  keywords?: string[];
}

export interface EmptyBlock extends AlexaBlock {
  type: "EmptyBlock";
}

export interface LocalizedBlock extends AlexaBlock {
  type: "LocalizedBlock";
  locales: Locale[];
  block: AlexaBlock;
}

export interface IntentBlock extends AlexaBlock {
  type: "IntentBlock";
  name: string;
  slots: Slot[];
  samples: string[];
}

export interface SlotTypeBlock extends AlexaBlock {
  type: "SlotTypeBlock";
  slotType: SlotType;
}

export interface WhenSlotNotFilledBlock extends AlexaBlock {
  type: "WhenSlotNotFilledBlock";
  name: string;
  then: AlexaBlock;
  otherwise?: AlexaBlock;
}

export interface SSMLSpeechBlock extends AlexaBlock {
  type: "SSMLSpeechBlock";
  speech: string;
}

export interface DirectiveBlock extends AlexaBlock {
  type: "DirectiveBlock";
  directive: Directive;
}

/**
 * Helper type aliases
 */
export type AlexaCompoundBlock = CompoundBlock<
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent
>;

export type AlexaWhenBlock = WhenBlock<
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent
>;

export type AlexaGotoStateBlock = GotoStateBlock<
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent
>;

export type AlexaCustomBlock = CustomBlock<
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent
>;

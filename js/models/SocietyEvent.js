const pad = (n) => String(n).padStart(2, '0');

/** One meeting of the Society, wrapping the raw data with date helpers. */
export class SocietyEvent {
  constructor(raw) {
    this.id = raw.id;
    this.kind = raw.kind;
    this.title = raw.title;
    this.question = raw.question ?? '';
    this.date = raw.date ?? null;
    this.time = raw.time ?? '';
    this.place = raw.place ?? '';
    this.people = raw.people ?? [];
    this.attendance = raw.attendance ?? null;
    this.summary = raw.summary ?? [];
    this.quote = raw.quote ?? null;
    this.quoteBy = raw.quoteBy ?? null;
    this.media = raw.media ?? [];
    this.sections = raw.sections ?? [];
    this.links = raw.links ?? [];
    this.bulletins = raw.bulletins ?? [];
    this.figures = raw.figures ?? null;
    this.poster = raw.poster ?? {};
    this.tilt = raw.tilt ?? 0;
    this.index = 0;
    this.opensSeason = false;
    // Noon avoids the date slipping a day in far-off timezones.
    this.when = this.date ? new Date(`${this.date}T12:00:00`) : null;
  }

  static compare(a, b) {
    if (!a.when) return b.when ? 1 : 0;
    if (!b.when) return -1;
    return a.when - b.when;
  }

  get hasDate() { return this.when !== null; }
  get isUpcoming() { return !this.when || this.when > new Date(); }

  get year() { return this.when ? String(this.when.getFullYear()) : null; }
  get day() { return this.when ? pad(this.when.getDate()) : null; }
  get month() {
    return this.when ? this.when.toLocaleDateString('en-US', { month: 'short' }) : 'TBA';
  }

  /** "Wednesday, January 22, 2025" */
  get longDate() {
    if (!this.when) return 'To be announced';
    return this.when.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  }

  /** "Wed, Jan 22" — used on generated posters. */
  get shortDate() {
    if (!this.when) return 'Date TBA';
    return this.when.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }

  /** School year, "2024–25". A new one starts in August. */
  get season() {
    if (!this.when) return null;
    const y = this.when.getFullYear();
    const start = this.when.getMonth() >= 7 ? y : y - 1;
    return `${start}–${String(start + 1).slice(2)}`;
  }

  /** "22 Jan 2025" — the label on the timeline rail. */
  get stamp() {
    return this.when ? `${this.day} ${this.month} ${this.year}` : 'Coming soon';
  }
}

#!/usr/bin/env python3
"""
generate_quotation.py
Generates a highly professional PDF quotation for ApnaApartments.com.
Uses the ReportLab library to construct a beautiful vector PDF.
"""

import sys
import os

try:
    from reportlab.lib.pagesizes import letter
    from reportlab.lib import colors
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import inch
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether, PageBreak
    from reportlab.pdfgen import canvas
except ImportError:
    print("ReportLab library not found.")
    print("Please install it by running: pip install reportlab")
    sys.exit(1)


class NumberedCanvas(canvas.Canvas):
    """
    Custom canvas to enable dynamic 'Page X of Y' numbering.
    Also adds professional running headers and footers.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b")) # Slate gray

        # Skip header and footer on page 1 (cover style) if desired, but here we include it subtly on all
        # running header
        self.drawString(54, 750, "PROJECT PROPOSAL & QUOTATION  |  ApnaApartments.com")
        self.setStrokeColor(colors.HexColor("#e2e8f0"))
        self.setLineWidth(0.5)
        self.line(54, 742, letter[0] - 54, 742)

        # running footer
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(letter[0] - 54, 40, page_text)
        self.drawString(54, 40, "Confidential Document prepared for Shafiq ur Rehman")
        self.line(54, 52, letter[0] - 54, 52)
        
        self.restoreState()


def create_quotation_pdf(output_filename="ApnaApartments_Quotation.pdf"):
    # Target page margins: 0.75in (54 points)
    doc = SimpleDocTemplate(
        output_filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=72,
        bottomMargin=72
    )

    styles = getSampleStyleSheet()
    
    # Custom Brand Colors
    PRIMARY_COLOR = colors.HexColor("#0b6e4f")    # Deep Green
    SECONDARY_COLOR = colors.HexColor("#0f172a")  # Slate Blue
    BODY_COLOR = colors.HexColor("#1e293b")       # Dark Charcoal
    MUTED_COLOR = colors.HexColor("#64748b")      # Muted Gray
    BG_LIGHT = colors.HexColor("#f8fafc")         # Soft Light Gray
    
    # Custom Paragraph Styles
    # Modifying existing styles or adding unique ones
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=SECONDARY_COLOR,
        spaceAfter=6
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=PRIMARY_COLOR,
        spaceAfter=20
    )
    
    metadata_style = ParagraphStyle(
        'MetadataText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=14,
        textColor=BODY_COLOR
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=PRIMARY_COLOR,
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=SECONDARY_COLOR,
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=BODY_COLOR,
        spaceAfter=8
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=BODY_COLOR,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=4
    )

    revision_warning_style = ParagraphStyle(
        'RevisionWarning',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=12.5,
        textColor=colors.HexColor("#78350f") # Warm Brown/Amber
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=colors.white
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=BODY_COLOR
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        textColor=BODY_COLOR
    )

    story = []

    # --- Header Banner / Document Info ---
    story.append(Paragraph("PROJECT PROPOSAL & QUOTATION", title_style))
    story.append(Paragraph("Transition to Full-Stack Apartment Real Estate Portal (ApnaApartments.com)", subtitle_style))
    
    # Metadata Table
    meta_data = [
      [
        Paragraph("<b>Client:</b> Shafiq ur Rehman", metadata_style),
        Paragraph("<b>Date:</b> July 6, 2026", metadata_style)
      ],
      [
        Paragraph("<b>Lead Engineer:</b> Muhammad Adnan Chohan", metadata_style),
        Paragraph("<b>Project Duration:</b> 1.5 Months (6 Weeks)", metadata_style)
      ],
      [
        Paragraph("<b>Co-Engineer & SQA:</b> Maria Narejo", metadata_style),
        Paragraph("<b>Validity:</b> 30 Days", metadata_style)
      ]
    ]
    meta_table = Table(meta_data, colWidths=[250, 250])
    meta_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 20))

    # --- Section 1: Executive Summary ---
    story.append(Paragraph("1. Executive Summary", h1_style))
    story.append(Paragraph(
        "This proposal outlines the technical scope, timeline, and financial quotation for upgrading the current "
        "responsive static interface of <b>ApnaApartments.com</b> into a robust, database-driven full-stack platform. "
        "Our goal is to build an apartment-focused real estate solution designed to wow clients and maximize lead "
        "conversions. The implementation includes an advanced administrator dashboard to manage property inventories, "
        "configure points of contact, and control property visibility.",
        body_style
    ))
    story.append(Paragraph(
        "The project will be built using modern, highly responsive architecture, guaranteeing mobile-first optimization "
        "and rapid load times. Development will be executed by <b>Muhammad Adnan Chohan</b> and <b>Maria Narejo</b>, "
        "delivering high-quality code and production deployment.",
        body_style
    ))

    # --- Section 2: Team Profiles & Portfolios ---
    story.append(Paragraph("2. Development Team & Portfolios", h1_style))
    story.append(Paragraph(
        "<b>Muhammad Adnan Chohan</b> (Lead Software Engineer)<br/>"
        "Specializes in frontend user experience, custom interactive search systems, mapping APIs, and UI animations.<br/>"
        "&bull; GitHub Portfolio: <font color='#0b6e4f'><u>github.com/adnanchohan</u></font><br/>"
        "&bull; Play Store Developer Console: <font color='#0b6e4f'><u>play.google.com/store/apps/dev?id=6586408803908987569</u></font>",
        bullet_style
    ))
    story.append(Paragraph(
        "<b>Maria Narejo</b> (Software Engineer & Software Quality Assurance Engineer)<br/>"
        "Specializes in backend API design, database schemas, secure admin auth, cross-browser validation, and quality assurance testing.",
        bullet_style
    ))
    story.append(Spacer(1, 10))

    # --- Section 3: Project Scope & Deliverables ---
    story.append(Paragraph("3. Project Scope & Deliverables", h1_style))
    story.append(Paragraph("The platform will be structured into three main component areas:", body_style))
    
    story.append(Paragraph("A. User-Facing Search Platform (ApnaApartments.com)", h2_style))
    story.append(Paragraph("&bull; <b>Property Details Cards:</b> Interactive details showing Title, Price (formatted in Lakhs/Crores PKR), Rent/Buy status, Bedrooms, Bathrooms, Area, Location, amenities, floor number, furnished status, and verified checkmarks.", bullet_style))
    story.append(Paragraph("&bull; <b>Multi-Filter Searching:</b> Combined filtering query inputs for city location, buy vs rent purpose, bedroom count, furnished status, and budget range slider.", bullet_style))
    story.append(Paragraph("&bull; <b>Direct Client Actions:</b> Direct dialer call button, auto-populated click-to-chat WhatsApp link, and a custom simulated email inquiry form.", bullet_style))
    story.append(Paragraph("&bull; <b>Saved Shortlist:</b> Client-side wishlist drawer that persists user selections across browser reloads using LocalStorage.", bullet_style))
    story.append(Paragraph("&bull; <b>Mapping Integration:</b> Pre-configured Leaflet map layer to pin geolocated properties (ready to show/hide dynamically via styles).", bullet_style))

    story.append(Paragraph("B. Gated Admin Dashboard & Settings Console", h2_style))
    story.append(Paragraph("&bull; <b>Listing Editor:</b> Secure panels to add, modify, delete, and archive apartment listings with full photo uploads.", bullet_style))
    story.append(Paragraph("&bull; <b>POC Manager:</b> Change the central Point of Contacts (phone numbers, WhatsApp numbers, pre-filled text templates) instantly across the site.", bullet_style))
    story.append(Paragraph("&bull; <b>Status Controls:</b> Toggle visibility to instantly Enable or Disable specific apartments or entire housing schemes.", bullet_style))

    story.append(Paragraph("C. Cloud Infrastructure & Operations (1-Year Package)", h2_style))
    story.append(Paragraph("&bull; <b>Backend API & Web Hosting:</b> Deploying frontend build and Node.js/Python server APIs on high-uptime web hosts.", bullet_style))
    story.append(Paragraph("&bull; <b>Database Plan:</b> Secure cloud storage database subscription to store apartment logs, settings, and coordinates.", bullet_style))
    story.append(Paragraph("&bull; <b>Media CDN Plan:</b> Image bucket storage dedicated to fast-loading property photo galleries.", bullet_style))

    story.append(PageBreak()) # Clean page break for timeline and commercial sections

    # --- Section 4: Project Timeline ---
    story.append(Paragraph("4. Project Timeline & Milestones (1.5 Months / 6 Weeks)", h1_style))
    story.append(Paragraph(
        "To provide visibility, the project is structured into progressive development phases. "
        "A **testing link (staging URL)** will be shared with the client during development, allowing real-time tracking.",
        body_style
    ))

    # Timeline Table
    timeline_data = [
        [
            Paragraph("Phase", table_header_style),
            Paragraph("Duration", table_header_style),
            Paragraph("Milestone Description & Outputs", table_header_style)
        ],
        [
            Paragraph("Phase 1: DB & API Setup", table_cell_bold),
            Paragraph("Week 1", table_cell_style),
            Paragraph("Setup relational schemas, cloud database instances, and secure authentication for the admin panel. Design API endpoints.", table_cell_style)
        ],
        [
            Paragraph("Phase 2: Frontend API Connection", table_cell_bold),
            Paragraph("Weeks 2-3", table_cell_style),
            Paragraph("Transition search filters, card listings, and wishlist drawer to consume live database endpoints instead of demo arrays.", table_cell_style)
        ],
        [
            Paragraph("Phase 3: Admin Dashboard", table_cell_bold),
            Paragraph("Week 4", table_cell_style),
            Paragraph("Build admin listing editors, file upload utilities, status toggles, and central POC configuration forms. <b>Deploy staging link.</b>", table_cell_style)
        ],
        [
            Paragraph("Phase 4: Staging Review & QA", table_cell_bold),
            Paragraph("Week 5", table_cell_style),
            Paragraph("Share staging link with the client. Conduct cross-browser, mobile responsiveness, and email routing QA. Apply revisions.", table_cell_style)
        ],
        [
            Paragraph("Phase 5: Launch & Handover", table_cell_bold),
            Paragraph("Week 6", table_cell_style),
            Paragraph("Map domain ApnaApartments.com, optimize backend caches, hand over admin login credentials, and transition support.", table_cell_style)
        ]
    ]

    t_timeline = Table(timeline_data, colWidths=[120, 70, 310])
    t_timeline.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY_COLOR),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_LIGHT]),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_timeline)
    story.append(Spacer(1, 15))

    # --- Section 5: Revisions Policy ---
    story.append(Paragraph("5. Revisions & Adjustments Policy", h1_style))
    
    warning_text = (
        "<b>Important Definition of Scope Revisions</b><br/><br/>"
        "We include three (3) full rounds of design and workflow revisions during the testing phase (Phase 4).<br/>"
        "A <i>revision</i> is defined as minor refinements, adjustments, and layouts to existing features detailed "
        "in the scope (e.g. altering color values, modifying typography sizing, tweaking text input labels, rearranging "
        "information grids, or updating contact email routing destinations).<br/><br/>"
        "Revisions do not cover the creation of new modules, changes to database structure, or implementing features "
        "outside the scope agreement. Any request for new features will be analyzed and quoted as a project addendum "
        "separately to avoid impacting the timeline."
    )
    
    t_warning = Table([[Paragraph(warning_text, revision_warning_style)]], colWidths=[500])
    t_warning.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#fffbeb")), # Light amber yellow
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#fef3c7")),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('LEFTPADDING', (0,0), (-1,-1), 14),
        ('RIGHTPADDING', (0,0), (-1,-1), 14),
    ]))
    story.append(t_warning)
    story.append(Spacer(1, 15))

    # --- Section 6: Financials & Commercial Terms ---
    story.append(Paragraph("6. Financials & Commercial Terms", h1_style))

    financial_data = [
        [
            Paragraph("Payment Milestone", table_header_style),
            Paragraph("Percentage", table_header_style),
            Paragraph("Due Condition", table_header_style),
            Paragraph("Amount", table_header_style)
        ],
        [
            Paragraph("<b>1. Advance Deposit</b>", table_cell_style),
            Paragraph("20%", table_cell_style),
            Paragraph("Due upon contract signing to initiate phase 1", table_cell_style),
            Paragraph("<b>PKR 50,000/=</b>", table_cell_style)
        ],
        [
            Paragraph("<b>2. Launch & Handover</b>", table_cell_style),
            Paragraph("80%", table_cell_style),
            Paragraph("Due upon final deployment and credentials transfer", table_cell_style),
            Paragraph("<b>PKR 200,000/=</b>", table_cell_style)
        ],
        [
            Paragraph("<b>Total Project Cost</b>", table_cell_bold),
            Paragraph("<b>100%</b>", table_cell_bold),
            Paragraph("<b>Includes 1 Year hosting and database subscriptions</b>", table_cell_bold),
            Paragraph("<b>PKR 250,000/=</b>", table_cell_bold)
        ]
    ]

    t_financial = Table(financial_data, colWidths=[130, 70, 200, 100])
    t_financial.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), SECONDARY_COLOR),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0,1), (-1,-2), [colors.white, BG_LIGHT]),
        ('BACKGROUND', (0,-1), (-1,-1), colors.HexColor("#e2e8f0")), # Gray totals row
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_financial)
    story.append(Spacer(1, 20))

    # Build PDF doc
    doc.build(story, canvasmaker=NumberedCanvas)


if __name__ == "__main__":
    create_quotation_pdf()
    print("Quotation PDF generated successfully.")

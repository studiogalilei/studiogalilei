"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";

// Studio Galilei tree (974 × 1132 coordinate space), from the official mark.
const MARK =
  "M398 1131C395 1126 396 1123 403 1121C422 1116 437 1102 446 1080C451 1067 452 1063 455 1048C459 1026 459 998 455 983C454 980 453 976 453 974C451 965 441 943 433 933C422 917 407 903 386 887C383 885 376 879 369 875C358 866 348 858 346 857C345 856 341 853 337 850C333 847 324 840 318 836C311 831 304 825 302 824C290 815 245 781 242 779C241 778 237 775 233 772C229 769 224 765 222 764C220 763 215 759 210 755C206 752 201 748 199 746C197 745 193 742 191 741C189 739 181 733 174 728C156 714 156 714 147 707C142 704 138 701 138 701C137 701 133 703 128 706C126 708 124 709 123 709C122 709 121 709 120 710C115 713 114 713 102 715C88 718 68 716 54 710C32 701 13 681 6 660C5 657 4 655 4 655C3 654 3 652 3 650C3 649 3 646 2 644C-0 638 1 612 4 605C5 604 6 602 6 600C15 577 36 556 59 549C72 545 73 545 88 545C107 546 112 547 124 552C134 557 156 575 156 578C156 578 157 580 158 580C159 581 160 583 160 583C160 584 161 586 163 588C169 597 174 617 174 630C174 638 172 650 170 657L168 661L182 671C199 684 216 696 222 700C225 702 228 705 231 707C233 708 237 712 241 715C245 717 248 720 249 721C251 722 273 739 277 741C280 743 291 752 300 758C304 761 307 764 307 764C308 764 312 767 318 772C333 783 347 794 358 802C377 817 387 824 402 835C409 841 417 846 419 848C422 850 437 862 438 863C441 866 460 883 460 882C461 882 461 846 461 802C461 720 461 722 457 698C457 696 456 695 456 694C455 694 455 693 455 692C455 690 455 689 454 688C453 688 453 687 453 686C453 684 443 664 440 660C439 659 438 658 438 658C438 655 411 626 347 562C313 528 308 522 268 482C251 464 232 444 226 438C219 431 209 421 204 415C199 409 194 404 193 404C192 403 190 404 186 406C184 407 181 408 180 408C179 408 178 408 178 409C177 409 176 410 174 410C172 411 168 412 165 412C159 413 142 414 135 413C126 411 113 407 107 404C93 396 85 389 76 376C65 361 61 348 60 330C59 322 60 309 62 302C63 300 63 297 64 295C65 291 70 281 75 274C84 261 94 252 109 245C124 237 132 236 148 236C161 236 163 236 171 238C195 246 209 256 221 274C226 281 232 295 234 302C236 312 237 324 236 333C235 346 234 350 233 351C232 351 232 352 232 353C232 354 231 357 230 359C229 362 228 364 228 365C228 366 281 421 320 460C353 493 424 565 441 583C455 597 460 602 460 601C461 600 461 508 461 396L460 194L456 192C454 191 451 190 450 190C448 189 447 188 446 188C444 187 441 185 438 184C435 182 432 180 432 180C432 180 430 178 428 177C426 176 421 171 417 168C394 145 385 113 391 78C394 58 409 35 427 20C434 15 453 5 456 5C457 5 458 5 458 4C460 2 482 -0 495 1C506 1 507 1 518 5C538 11 556 25 567 41C582 64 587 85 584 113C583 118 582 122 582 123C581 123 581 124 581 126C581 127 581 128 580 128C579 129 579 130 579 131C579 134 571 149 566 156C561 163 544 179 542 179C542 179 541 180 540 180C538 183 524 190 520 191C517 192 515 193 514 193C513 194 513 236 513 398C513 515 513 602 514 602C515 602 525 593 538 578C544 572 567 549 589 526C612 502 635 479 641 473C647 467 657 456 665 448C672 441 684 429 691 422C698 414 713 399 725 387C748 364 747 365 744 358C741 352 741 350 738 339C736 330 737 307 740 302C741 301 741 299 741 298C741 298 741 296 742 295C742 294 743 292 744 291C746 285 750 277 751 276C752 275 754 273 755 271C762 260 779 247 792 242C808 236 812 236 826 236C838 236 841 236 849 238C866 243 875 248 887 260C893 265 904 279 904 281C904 282 905 285 907 288C916 309 917 332 910 354C908 360 904 369 902 371C901 372 900 374 899 376C897 380 879 397 874 400C859 408 857 409 848 411C845 411 840 412 837 413C829 415 817 414 800 410C798 410 797 409 796 409C796 408 795 408 794 408C794 408 791 407 789 406C786 405 784 404 783 404C781 404 759 426 676 512C669 519 647 541 628 560C610 580 589 601 583 607C577 613 566 624 559 632C551 640 543 648 541 650C533 662 526 674 522 684C521 687 519 690 519 692C519 693 518 695 518 696C517 698 516 702 515 706C514 712 514 724 513 798C513 891 513 886 519 880C525 873 549 853 562 844C565 842 571 837 575 834C589 824 599 816 602 814C604 812 607 810 608 809C613 805 613 805 639 786C652 776 665 766 668 764C670 762 674 760 676 758C682 753 699 740 706 735C710 732 714 729 715 729C717 727 728 718 734 714C756 698 761 693 763 692C765 691 777 682 778 681C778 681 779 680 780 680C781 679 787 675 793 670C804 662 804 661 804 658C804 656 803 654 803 654C802 653 802 651 802 649C802 648 802 646 801 646C800 645 800 620 801 616C801 614 802 610 803 608C806 600 810 590 814 583C826 566 847 551 866 547C873 545 900 545 904 546C907 547 910 548 912 548C934 554 956 573 965 594C967 598 969 601 969 602C971 605 974 624 974 630C974 636 972 648 970 655C961 682 944 700 916 712C914 712 912 713 910 713C888 718 886 718 865 714C860 713 847 707 840 703C836 701 836 701 834 703C832 704 821 712 809 721C773 749 758 760 757 761C757 761 754 764 750 766C746 768 743 771 743 771C742 772 734 778 717 791C712 795 698 805 686 814C675 823 662 833 658 836C651 840 609 872 598 880C595 883 592 885 590 886C587 888 583 892 574 899C550 918 532 942 525 962C524 965 523 967 523 967C522 968 522 970 522 971C522 973 522 974 521 974C521 975 520 976 520 978C519 980 519 984 518 988C516 995 516 1032 518 1042C519 1046 519 1051 520 1053C520 1055 521 1057 521 1058C522 1058 522 1060 522 1062C522 1063 522 1065 523 1066C524 1066 524 1067 524 1069C524 1070 524 1072 525 1073C525 1074 527 1077 528 1079C532 1090 534 1093 539 1099C542 1103 546 1108 550 1110C556 1115 565 1120 568 1120C569 1120 570 1120 570 1121C571 1122 572 1122 574 1122C579 1122 580 1127 577 1130C575 1132 574 1132 487 1132C418 1132 399 1132 398 1131Z";

type Stamp =
  | {
      shape: "round";
      color: string;
      text: string;
      rotate: number;
      className: string;
    }
  | {
      shape: "rect";
      color: string;
      lines: [string, string];
      rotate: number;
      className: string;
    };

const STAMPS: Stamp[] = [
  {
    shape: "round",
    color: "#061773",
    text: "STUDIO GALILEI • MARKETING • AI • SOFTWARE • ",
    rotate: -14,
    className: "top-[4%] left-[calc(50%-480px)] max-lg:top-[-4%] max-lg:left-0 max-sm:top-[-22%]",
  },
  {
    shape: "round",
    color: "#d21205",
    text: "MISURA CIÒ CHE È MISURABILE • STUDIO GALILEI • ",
    rotate: 12,
    className:
      "top-[34%] right-[calc(50%-480px)] max-lg:top-[-10%] max-lg:right-0 max-sm:top-[-22%]",
  },
  {
    shape: "rect",
    color: "#0689ff",
    lines: ["STUDIO GALILEI", "PARTNER DI CRESCITA"],
    rotate: -7,
    className: "bottom-[-16%] left-[calc(50%-330px)] w-[160px] max-lg:hidden",
  },
  {
    shape: "round",
    color: "#2f6b33",
    text: "METODO GALILEI • OSSERVABILE • REPLICABILE • ",
    rotate: 18,
    className: "top-[-18%] right-[calc(50%-300px)] w-24 max-lg:hidden",
  },
];

function Tree({ cx, cy, h }: { cx: number; cy: number; h: number }) {
  const s = h / 1132;
  return (
    <path
      fillRule="evenodd"
      d={MARK}
      transform={`translate(${cx - 487 * s} ${cy - 566 * s}) scale(${s})`}
    />
  );
}

function StampSvg({ stamp, seed }: { stamp: Stamp; seed: number }) {
  const id = useId();
  const ink = (
    <filter id={`${id}f`} x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence
        type="fractalNoise"
        baseFrequency=".9"
        numOctaves={2}
        seed={seed * 7}
        result="r"
      />
      <feColorMatrix
        in="r"
        type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.5"
        result="m"
      />
      <feComposite in="SourceGraphic" in2="m" operator="in" result="c" />
      <feTurbulence type="fractalNoise" baseFrequency=".04" numOctaves={2} seed={seed} result="d" />
      <feDisplacementMap in="c" in2="d" scale={2.2} />
    </filter>
  );
  const textProps = {
    stroke: "none",
    fontWeight: 600,
    fontFamily: "Poppins, sans-serif",
  };
  if (stamp.shape === "round") {
    return (
      <svg viewBox="0 0 120 120" aria-hidden="true" className="block h-auto w-full opacity-95">
        <defs>
          {ink}
          <path id={`${id}c`} d="M60 60 m-42 0 a42 42 0 1 1 84 0 a42 42 0 1 1 -84 0" />
        </defs>
        <g fill={stamp.color} stroke={stamp.color} filter={`url(#${id}f)`}>
          <circle cx="60" cy="60" r="56" fill="none" strokeWidth="3" />
          <circle cx="60" cy="60" r="50.5" fill="none" strokeWidth="1" />
          <circle cx="60" cy="60" r="31" fill="none" strokeWidth="1.2" />
          <text fontSize="9.4" letterSpacing="1.1" {...textProps}>
            <textPath href={`#${id}c`} textLength="262" lengthAdjust="spacing">
              {stamp.text}
            </textPath>
          </text>
          <g stroke="none">
            <Tree cx={60} cy={60} h={38} />
          </g>
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 170 74" aria-hidden="true" className="block h-auto w-full opacity-95">
      <defs>{ink}</defs>
      <g fill={stamp.color} stroke={stamp.color} filter={`url(#${id}f)`}>
        <rect x="3" y="3" width="164" height="68" rx="6" fill="none" strokeWidth="3" />
        <rect x="8.5" y="8.5" width="153" height="57" rx="3" fill="none" strokeWidth="1" />
        <g stroke="none">
          <Tree cx={32} cy={37} h={40} />
        </g>
        <line x1="56" y1="15" x2="56" y2="59" strokeWidth="1" />
        <text x="111" y="34" textAnchor="middle" fontSize="12.5" letterSpacing="1" {...textProps}>
          {stamp.lines[0]}
        </text>
        <text x="111" y="51" textAnchor="middle" fontSize="8.2" letterSpacing="1.4" {...textProps}>
          {stamp.lines[1]}
        </text>
      </g>
    </svg>
  );
}

/** Four ink stamps that land around the CTA when it scrolls into view. */
export function Stamps() {
  const ref = useRef<HTMLDivElement>(null);
  const [stamped, setStamped] = useState(false);

  useEffect(() => {
    const box = ref.current?.parentElement;
    if (!box || matchMedia("(prefers-reduced-motion: reduce)").matches) return setStamped(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setStamped(true);
      },
      { threshold: 0.5 },
    );
    io.observe(box);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0">
      {STAMPS.map((stamp, i) => (
        <span
          key={stamp.color}
          style={
            {
              "--rot": `${stamp.rotate}deg`,
              animationDelay: `${i * 0.18}s`,
            } as React.CSSProperties
          }
          className={cn(
            "absolute block w-[124px] [transform:rotate(var(--rot))_scale(1.7)] opacity-0 mix-blend-multiply max-lg:w-[84px] max-sm:w-[66px]",
            stamp.className,
            stamped && "animate-stamp",
          )}
        >
          <StampSvg stamp={stamp} seed={i + 1} />
        </span>
      ))}
    </div>
  );
}

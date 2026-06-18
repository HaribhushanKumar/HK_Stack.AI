import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCpu, FiCode, FiActivity } from 'react-icons/fi';

/**
 * Premium AnimatedBadge component for advanced labels, skills, and categories.
 */

// Colors & styles for Skill Proficiency Levels
const getLevelStyle = (level) => {
    switch (level?.toLowerCase()) {
        case 'expert':
            return {
                bg: 'rgba(239, 68, 68, 0.15)',
                text: '#ef4444',
                border: 'rgba(239, 68, 68, 0.25)',
                label: 'Pro/Expert'
            };
        case 'advanced':
            return {
                bg: 'rgba(99, 102, 241, 0.15)',
                text: 'var(--accent-primary)',
                border: 'rgba(99, 102, 241, 0.25)',
                label: 'Advanced'
            };
        case 'intermediate':
        default:
            return {
                bg: 'rgba(20, 184, 166, 0.15)',
                text: 'var(--accent-secondary)',
                border: 'rgba(20, 184, 166, 0.25)',
                label: 'Intermediate'
            };
    }
};

// 1. Hero Badge Component
export const HeroBadge = ({ text, icon }) => {
    return (
        <motion.div
            className="border-beam-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            whileHover={{ scale: 1.03 }}
        >
            <span className="pulse-dot"></span>
            <span className="badge-text" style={{ zIndex: 2 }}>{text}</span>
        </motion.div>
    );
};

// 2. Section Label Component
export const SectionLabel = ({ text, icon }) => {
    return (
        <div className="animated-section-label-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <motion.div
                className="section-label-wrapper"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5 }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
                {icon && (
                    <motion.span 
                        className="section-label-icon"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                        style={{ display: 'flex', color: 'var(--accent-secondary)', fontSize: '0.9rem' }}
                    >
                        {icon}
                    </motion.span>
                )}
                <span className="section-label">{text}</span>
            </motion.div>
            <motion.div
                className="section-label-underline"
                initial={{ width: 0 }}
                whileInView={{ width: '40px' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                style={{
                    height: '2px',
                    background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
                    borderRadius: '2px'
                }}
            />
        </div>
    );
};

// 3. Interactive Skill Tag Component
export const SkillTag = ({ text, level }) => {
    const [hovered, setHovered] = useState(false);
    const style = getLevelStyle(level);

    return (
        <motion.div
            className="skill-tag-container glass-card"
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileHover={{ 
                y: -3, 
                borderColor: style.border, 
                boxShadow: `0 8px 20px -8px ${style.text}`
            }}
            layout
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '8px 16px',
                borderRadius: '12px',
                cursor: 'default',
                fontSize: '0.88rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                backgroundColor: 'var(--bg-glass)',
                border: '1px solid var(--border-glass)',
                overflow: 'hidden'
            }}
        >
            <span className="skill-name-text" style={{ transition: 'color 0.2s', color: hovered ? 'var(--text-primary)' : 'inherit' }}>{text}</span>
            <AnimatePresence>
                {hovered && level && (
                    <motion.span
                        className="skill-level-badge"
                        initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                        animate={{ width: 'auto', opacity: 1, marginLeft: 8 }}
                        exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        style={{
                            display: 'inline-flex',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            padding: '2px 8px',
                            borderRadius: '6px',
                            border: `1px solid ${style.border}`,
                            backgroundColor: style.bg,
                            color: style.text,
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {style.label}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// 4. Project Category Badge Component
export const ProjectCategoryBadge = ({ category }) => {
    const isAi = category?.toLowerCase() === 'ai' || category?.toLowerCase() === 'ai / ml';
    
    return (
        <motion.span
            className={`project-type-badge ${isAi ? 'badge-ai' : 'badge-fullstack'}`}
            whileHover={{ scale: 1.05, y: -1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                padding: '5px 12px',
                borderRadius: '100px',
                zIndex: 2,
                cursor: 'pointer'
            }}
        >
            <span className="badge-icon" style={{ display: 'flex', fontSize: '0.85rem' }}>
                {isAi ? <FiCpu /> : <FiCode />}
            </span>
            {isAi ? 'AI / ML' : 'Full Stack'}
        </motion.span>
    );
};

// 5. Monospace Tech Tag
export const TechTag = ({ text }) => {
    return (
        <motion.span
            className="project-tech-tag"
            whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(99, 102, 241, 0.08)',
                borderColor: 'rgba(99, 102, 241, 0.35)',
                color: 'var(--text-primary)',
                boxShadow: '0 0 12px rgba(99, 102, 241, 0.15)'
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
                fontFamily: 'var(--font-code)',
                fontSize: '0.75rem',
                padding: '4px 10px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-glass)',
                color: 'var(--accent-primary)',
                cursor: 'default',
                display: 'inline-block'
            }}
        >
            {text}
        </motion.span>
    );
};
